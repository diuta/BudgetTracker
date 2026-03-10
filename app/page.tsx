"use client";

import { useState, useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";
import { filterByMonth, calcTotals, groupByCategory, groupByDay, getMonthLabel, formatCurrency } from "@/lib/utils";
import { SummaryCard } from "@/components/SummaryCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { TransactionModal } from "@/components/TransactionModal";
import { TrendingUp, TrendingDown, Wallet, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
} from "recharts";

export default function DashboardPage() {
  const { transactions, addTransaction } = useTransactions();
  const { categories } = useCategories();
  const { settings } = useSettings();
  const [showModal, setShowModal] = useState(false);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const monthTxs = useMemo(() => filterByMonth(transactions, year, month), [transactions, year, month]);
  const { income, expense, net } = useMemo(() => calcTotals(monthTxs), [monthTxs]);

  // Donut data
  const categoryTotals = useMemo(() => groupByCategory(monthTxs), [monthTxs]);
  const donutData = useMemo(() =>
    Object.entries(categoryTotals).map(([id, value]) => {
      const cat = categories.find(c => c.id === id);
      return { name: cat?.name ?? id, value, color: cat?.color ?? "#64748b" };
    }).sort((a, b) => b.value - a.value),
    [categoryTotals, categories]
  );

  // Bar chart data
  const barData = useMemo(() => groupByDay(transactions, year, month), [transactions, year, month]);

  const recentTxs = useMemo(() =>
    [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7),
    [transactions]
  );

  const sym = settings.currencySymbol;

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-card border rounded-xl px-3 py-2 text-sm shadow-lg" style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}>
          <span className="text-primary font-semibold">{formatCurrency(payload[0].value, sym)}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <p className="text-sm text-secondary mt-0.5">Your financial overview</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-emerald-500/25 hover:shadow-emerald-500/40"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Month picker */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-secondary transition-colors"><ChevronLeft size={16} /></button>
        <span className="text-sm font-semibold text-primary">{getMonthLabel(year, month)}</span>
        <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-secondary transition-colors"><ChevronRight size={16} /></button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        <SummaryCard
          label="Spent"
          value={formatCurrency(expense, sym)}
          icon={<TrendingDown size={14} />}
          accent="#ef4444"
          className="col-span-1"
        />
        <SummaryCard
          label="Income"
          value={formatCurrency(income, sym)}
          icon={<TrendingUp size={14} />}
          accent="#10b981"
          className="col-span-1"
        />
        <SummaryCard
          label="Net Balance"
          value={formatCurrency(Math.abs(net), sym)}
          icon={<Wallet size={14} />}
          accent={net >= 0 ? "#10b981" : "#ef4444"}
          className="col-span-2 md:col-span-1"
          trend={net > 0 ? "up" : net < 0 ? "down" : "neutral"}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Bar chart */}
        <div
          className="lg:col-span-3 bg-card rounded-2xl p-5 card-shadow border"
          style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}
        >
          <h2 className="text-sm font-semibold text-primary mb-4">Daily Spending</h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} barSize={28}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgb(var(--text-secondary))" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-44 flex items-center justify-center">
              <p className="text-sm text-muted">No spending this month yet</p>
            </div>
          )}
        </div>

        {/* Donut chart */}
        <div
          className="lg:col-span-2 bg-card rounded-2xl p-5 card-shadow border"
          style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}
        >
          <h2 className="text-sm font-semibold text-primary mb-4">By Category</h2>
          {donutData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={72}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value), sym), ""]}
                  contentStyle={{ borderRadius: "12px", border: `1px solid rgb(var(--border))`, backgroundColor: "rgb(var(--bg-card))", color: "rgb(var(--text-primary))", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-44 flex items-center justify-center">
              <p className="text-sm text-muted">No data yet</p>
            </div>
          )}
          {/* Legend */}
          <div className="mt-2 flex flex-wrap gap-2">
            {donutData.slice(0, 4).map((d, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs text-secondary">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div
        className="bg-card rounded-2xl card-shadow border"
        style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}
      >
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgb(var(--border))" }}>
          <h2 className="text-sm font-semibold text-primary">Recent Transactions</h2>
          <a href="/transactions" className="text-xs font-medium text-emerald-500 hover:text-emerald-600 transition-colors">View all</a>
        </div>
        {recentTxs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted">No transactions yet.</p>
            <button onClick={() => setShowModal(true)} className="mt-3 text-sm font-medium text-emerald-500 hover:text-emerald-600">
              Add your first one →
            </button>
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "rgb(var(--border))" }}>
            {recentTxs.map(tx => {
              const cat = categories.find(c => c.id === tx.categoryId);
              return (
                <li key={tx.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                    style={{ backgroundColor: `${cat?.color ?? "#64748b"}18`, color: cat?.color ?? "#64748b" }}
                  >
                    {cat?.name?.charAt(0) ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{tx.note || cat?.name || "Transaction"}</p>
                    <p className="text-xs text-muted">{format(parseISO(tx.date), "MMM d, yyyy")}</p>
                  </div>
                  <span className={`text-sm font-semibold ${tx.type === "income" ? "text-emerald-500" : "text-red-500"}`}>
                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount, sym)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {showModal && (
        <TransactionModal
          categories={categories}
          currencySymbol={sym}
          onSave={addTransaction}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
