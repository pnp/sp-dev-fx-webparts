import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../utilties/components/ui/card"

const ProjectDashboard = () => {
  // Dummy data for projects
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      progress: 75,
      status: "In Progress",
      dueDate: "2024-12-15",
    },
    {
      id: 2,
      name: "Mobile App Development",
      progress: 45,
      status: "In Progress",
      dueDate: "2024-12-30",
    },
    {
      id: 3,
      name: "Database Migration",
      progress: 90,
      status: "Review",
      dueDate: "2024-11-20",
    },
    {
      id: 4,
      name: "API Integration",
      progress: 60,
      status: "In Progress",
      dueDate: "2024-12-10",
    },
  ]

  // Team members data
  const teamMembers = [
    { name: "John Doe", role: "Project Manager", tasks: 8, avatar: "JD" },
    { name: "Sarah Smith", role: "Developer", tasks: 12, avatar: "SS" },
    { name: "Mike Johnson", role: "Designer", tasks: 6, avatar: "MJ" },
    { name: "Emily Brown", role: "Developer", tasks: 10, avatar: "EB" },
  ]

  // Recent activities
  const recentActivities = [
    {
      user: "Sarah Smith",
      action: "completed task",
      project: "Website Redesign",
      time: "2 hours ago",
    },
    {
      user: "Mike Johnson",
      action: "added new design",
      project: "Mobile App",
      time: "4 hours ago",
    },
    {
      user: "John Doe",
      action: "updated status",
      project: "Database Migration",
      time: "5 hours ago",
    },
    {
      user: "Emily Brown",
      action: "commented on",
      project: "API Integration",
      time: "6 hours ago",
    },
  ]

  return (
    <div className='p-8 flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Project Dashboard</h1>
        <span className='text-sm text-gray-500'>Last updated: 2 hours ago</span>
      </div>

      {/* Stats Overview */}
      <div className='flex flex-wrap gap-4'>
        <Card className='flex-1 min-w-[240px]'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>4 active</p>
          </CardContent>
        </Card>

        <Card className='flex-1 min-w-[240px]'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>89</div>
            <p className='text-xs text-muted-foreground'>34 in progress</p>
          </CardContent>
        </Card>

        <Card className='flex-1 min-w-[240px]'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>16</div>
            <p className='text-xs text-muted-foreground'>3 new this month</p>
          </CardContent>
        </Card>

        <Card className='flex-1 min-w-[240px]'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>67%</div>
            <p className='text-xs text-green-500'>12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>
            Current ongoing projects and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            {projects.map((project) => (
              <div
                key={project.id}
                className='flex items-center justify-between p-4 border rounded-lg'
              >
                <div>
                  <h3 className='font-medium'>{project.name}</h3>
                  <p className='text-sm text-gray-500'>
                    Due: {project.dueDate}
                  </p>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='text-sm text-gray-500'>{project.status}</div>
                  <div className='w-20'>
                    <div className='bg-gray-200 rounded-full h-2.5'>
                      <div
                        className='bg-blue-600 h-2.5 rounded-full'
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className='text-sm font-medium'>
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Members and Recent Activities */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Team Members */}
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Active team members and their tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold'>
                      {member.avatar}
                    </div>
                    <div>
                      <p className='font-medium'>{member.name}</p>
                      <p className='text-sm text-gray-500'>{member.role}</p>
                    </div>
                  </div>
                  <div className='text-sm text-gray-500'>
                    {member.tasks} tasks
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from the team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className='flex items-start gap-4 p-4 border rounded-lg'
                >
                  <div>
                    <p className='text-sm'>
                      <span className='font-medium'>{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className='font-medium'>{activity.project}</span>
                    </p>
                    <p className='text-xs text-gray-500'>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectDashboard
