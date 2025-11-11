import { Card } from "../ui/Card"
import { Button } from "../ui/Button"

export default function UserListTable() {
  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "organizer", events: 3 },
    { id: 2, name: "Sarah Chen", email: "sarah@example.com", role: "participant", events: 5 },
    { id: 3, name: "Mike Wilson", email: "mike@example.com", role: "participant", events: 2 },
    { id: 4, name: "Tech Academy", email: "tech@academy.com", role: "organizer", events: 12 },
  ]

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Recent Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold">Name</th>
              <th className="text-left py-2 px-3 font-semibold">Email</th>
              <th className="text-left py-2 px-3 font-semibold">Role</th>
              <th className="text-left py-2 px-3 font-semibold">Events</th>
              <th className="text-left py-2 px-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-3 font-semibold">{user.name}</td>
                <td className="py-3 px-3">{user.email}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === "organizer"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-3">{user.events}</td>
                <td className="py-3 px-3">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
