import { getIconBg, getStatusColor, statusCards } from "@/types/types";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const StatusCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statusCards.map((card, index) => (
        <div
          key={index}
          className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${getStatusColor(
            card.status
          )}`}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm text-muted-foreground">{card.title}</span>
            <card.icon className={`w-5 h-5 ${getIconBg(card.status)}`} />
          </div>
          <div
            className={`text-xl font-bold mb-1 ${
              card.isHighlight ? "text-primary" : ""
            }`}
          >
            {card.value}
          </div>
          {card.subtitle && (
            <p className="text-xs text-muted-foreground">{card.subtitle}</p>
          )}
          {card.action && (
            <Link
              to={card.action.href}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
            >
              {card.action.label}
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusCards;
