import { Calendar1, MessageCircle, LayoutGrid, Users, BarChart2, Bell } from "lucide-react"
import { Card } from "../ui/Card"


const features = [
  {
    title: "Event Management",
    description: "Create, schedule, and manage events with intuitive tools",
    icon: <Calendar1 className="w-6 h-6" />,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    title: "Real-time Chat",
    description: "Connect with participants through built-in messaging",
    icon: <MessageCircle className="w-6 h-6" />,
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
  },
  {
    title: "Calendar View",
    description: "Visualize all your events in a beautiful calendar interface",
    icon: <LayoutGrid className="w-6 h-6" />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Role-based Access",
    description: "Admin, organizer, and participant roles with custom permissions",
    icon: <Users className="w-6 h-6" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Notifications",
    description: "Stay updated with real-time event notifications",
    icon: <Bell className="w-6 h-6" />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Analytics",
    description: "Track event statistics and participant engagement",
    icon: <BarChart2 className="w-6 h-6" />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-secondary/30 px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage events and collaborate with your community
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-5 bg-background border border-border hover:border-primary/50 transition">
              <div className={`p-3 w-fit rounded-lg  ${feature.iconBg}`}>
                {feature.icon && (
                  <div className={feature.iconColor}> {feature.icon} </div>
                )}
              </div>
              <h3 className=" mt-3 font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
