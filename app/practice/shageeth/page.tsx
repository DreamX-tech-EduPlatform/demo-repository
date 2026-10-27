import { Badge } from '@dreamx-tech-eduplatform/practice-shageeth';

export default function PracticePage() {
  return (
    <main className="mx-auto max-w-xl space-y-4 p-8">
      <h1 className="text-2xl font-bold">Practice page</h1>
      <div className="flex gap-2">
        <Badge>Neutral</Badge>
        <Badge tone="success">Paid</Badge>
        <Badge tone="danger">Absent</Badge>
        <Badge tone="success" className="uppercase">Override test</Badge>
      </div>
    </main>
  );
}
