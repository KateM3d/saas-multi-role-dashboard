import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "./Dashboard.scss";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
  // Sample data for the dashboard
  const [stats] = useState({
    totalProjects: 12,
    activeProjects: 8,
    tasksCompleted: 156,
    tasksPending: 23,
  });

  // Sample data for the chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [65, 78, 90, 85, 95, 110],
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard Overview</h1>
        <div className="dashboard__header-actions">
          {/* Add actions/buttons here if needed */}
        </div>
      </div>

      <div className="dashboard__grid">
        <div className="dashboard__card">
          <div className="dashboard__card-header">Total Projects</div>
          <div className="dashboard__card-content">
            <h3>{stats.totalProjects}</h3>
            <p>Projects in total</p>
          </div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-header">Active Projects</div>
          <div className="dashboard__card-content">
            <h3>{stats.activeProjects}</h3>
            <p>Currently in progress</p>
          </div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-header">Completed Tasks</div>
          <div className="dashboard__card-content">
            <h3>{stats.tasksCompleted}</h3>
            <p>Tasks finished</p>
          </div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-header">Pending Tasks</div>
          <div className="dashboard__card-content">
            <h3>{stats.tasksPending}</h3>
            <p>Tasks to be completed</p>
          </div>
        </div>
      </div>

      <div className="dashboard__chart">
        <h2>Task Completion Trend</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
