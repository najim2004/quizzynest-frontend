import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-64 h-full shadow-lg">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>
      <ul className="flex-grow">
        {items.map((item) => (
          <li key={item.title} className="group">
            <a
              href={item.url}
              className="flex items-center gap-4 p-4 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center h-16">
        <span>Footer Content</span>
      </div>
    </div>
  );
}
