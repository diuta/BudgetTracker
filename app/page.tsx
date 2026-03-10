"use client";

import { useState, useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { filterByMonth, calcTotals, groupByCategory, groupByDay, getMonthLabel } from "@/utils/dateHelpers";
import { PageHeader } from "@/components/ui/PageHeader";
import { MonthNavigator } from "@/components/ui/MonthNavigator";
import { EntryModal } from "@/components/ui/EntryModal";
import { StatCards } from "@/components/dashboard/StatCards";
import { DailySpendingChart } from "@/components/dashboard/DailySpendingChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { RecentEntries } from "@/components/dashboard/RecentEntries";
import { FIXED_CATEGORIES } from "@/constants/categories";

export default function DashboardPage() {
  const { transactions, addTransaction } = useTransactions();
  const { categories } = useCategories();
  const [showModal, setShowModal] = useState(false);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const monthTxs = useMemo(() => filterByMonth(transactions, year, month), [transactions, year, month]);
  const { income, expense, net } = useMemo(() => calcTotals(monthTxs), [monthTxs]);
  const categoryTotals = useMemo(() => groupByCategory(monthTxs), [monthTxs]);

  const donutData = useMemo(() =>
    FIXED_CATEGORIES
      .map(cat => ({ name: cat.name, emoji: cat.emoji, value: categoryTotals[cat.id] ?? 0, color: cat.color, id: cat.id }))
      .filter(d => d.value > 0)
      .sort((a, b) => b.value - a.value),
    [categoryTotals]
  );

  const barData = useMemo(() => groupByDay(transactions, year, month), [transactions, year, month]);

  const recentTxs = useMemo(() =>
    [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8),
    [transactions]
  );

  const monthLabel = getMonthLabel(year, month);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow={`Personal Finance Ledger • ${monthLabel}`}
        title="Dashboard"
        action={<button className="btn-crimson" onClick={() => setShowModal(true)}>+ New Entry</button>}
      />

      <MonthNavigator label={monthLabel} onPrev={prevMonth} onNext={nextMonth} />

      <StatCards income={income} expense={expense} net={net} monthLabel={monthLabel} />

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "24px", marginBottom: "48px" }} className="chart-grid">
        <DailySpendingChart data={barData} monthLabel={monthLabel} />
        <CategoryChart data={donutData} />
      </div>

      <RecentEntries transactions={recentTxs} categories={categories} onAddClick={() => setShowModal(true)} />

      {showModal && (
        <EntryModal categories={categories} onSave={addTransaction} onClose={() => setShowModal(false)} />
      )}

      <style>{`
        @media (max-width: 768px) { .chart-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
