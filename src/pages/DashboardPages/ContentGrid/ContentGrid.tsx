import { Button } from "@/components/ui/button";
import { recentActivity } from "@/types/types";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

const ContentGrid = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <activity.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Actions */}
      <div className="p-6 rounded-2xl border border-accent/50 gradient-accent">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-accent-foreground" />
          <h2 className="font-semibold text-accent-foreground">
            Pending Actions
          </h2>
        </div>
        <div className="bg-card/20 backdrop-blur-sm rounded-xl p-4">
          <h3 className="font-medium text-accent-foreground mb-2">
            Complete Visa Application
          </h3>
          <p className="text-sm text-accent-foreground/80 mb-4">
            You need to submit your passport details to proceed with travel
            arrangements.
          </p>
          <Link to="/dashboard/visa">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Application
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentGrid;
