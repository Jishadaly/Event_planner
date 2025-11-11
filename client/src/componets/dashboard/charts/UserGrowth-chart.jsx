
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "../../ui/Card"

export default function UserGrowthChart({ data }) {
  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">User Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
