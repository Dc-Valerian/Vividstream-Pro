import {
  Ticket,
  Plane,
  Hotel,
  Trophy,
} from "lucide-react";

export const worldCupCountries = [
  {
    name: "Brazil",
    flag: "🇧🇷",
    group: "A",
    colors: ["#009c3b", "#ffdf00", "#002776"],
    flagImg: "https://flagcdn.com/w80/br.png",
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    group: "B",
    colors: ["#74acdf", "#ffffff", "#74acdf"],
    flagImg: "https://flagcdn.com/w80/ar.png",
  },
  {
    name: "France",
    flag: "🇫🇷",
    group: "C",
    colors: ["#002654", "#ffffff", "#ce1126"],
    flagImg: "https://flagcdn.com/w80/fr.png",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    group: "D",
    colors: ["#000000", "#dd0000", "#ffcc00"],
    flagImg: "https://flagcdn.com/w80/de.png",
  },
  {
    name: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    group: "E",
    colors: ["#ffffff", "#ce1126", "#ffffff"],
    flagImg: "https://flagcdn.com/w80/gb-eng.png",
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    group: "F",
    colors: ["#c60b1e", "#ffc400", "#c60b1e"],
    flagImg: "https://flagcdn.com/w80/es.png",
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    group: "G",
    colors: ["#006600", "#ff0000", "#ffcc00"],
    flagImg: "https://flagcdn.com/w80/pt.png",
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    group: "H",
    colors: ["#ae1c28", "#ffffff", "#21468b"],
    flagImg: "https://flagcdn.com/w80/nl.png",
  },
  {
    name: "USA",
    flag: "🇺🇸",
    group: "A",
    colors: ["#b22234", "#ffffff", "#3c3b6e"],
    flagImg: "https://flagcdn.com/w80/us.png",
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    group: "B",
    colors: ["#006847", "#ffffff", "#ce1126"],
    flagImg: "https://flagcdn.com/w80/mx.png",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    group: "C",
    colors: ["#ff0000", "#ffffff", "#ff0000"],
    flagImg: "https://flagcdn.com/w80/ca.png",
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    group: "D",
    colors: ["#000000", "#ffd90c", "#f31830"],
    flagImg: "https://flagcdn.com/w80/be.png",
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    group: "E",
    colors: ["#009246", "#ffffff", "#ce2b37"],
    flagImg: "https://flagcdn.com/w80/it.png",
  },
  {
    name: "Croatia",
    flag: "🇭🇷",
    group: "F",
    colors: ["#ff0000", "#ffffff", "#171796"],
    flagImg: "https://flagcdn.com/w80/hr.png",
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    group: "G",
    colors: ["#ffffff", "#bc002d", "#ffffff"],
    flagImg: "https://flagcdn.com/w80/jp.png",
  },
  {
    name: "Morocco",
    flag: "🇲🇦",
    group: "H",
    colors: ["#c1272d", "#006233", "#c1272d"],
    flagImg: "https://flagcdn.com/w80/ma.png",
  },
];

export const colors = [
  "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500/30",
  "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
  "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30",
  "bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-violet-500/30",
  "bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border-indigo-500/30",
  "bg-gradient-to-r from-lime-500/20 to-green-500/20 border-lime-500/30",
  "bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30",
];

export const stats = [
  { value: "50K+", label: "Tickets Redeemed" },
  { value: "120+", label: "Countries Served" },
  { value: "99.9%", label: "Uptime" },
  { value: "2/47", label: "Support" },
];

export const features = [
  {
    icon: Ticket,
    title: "Ticket Redemption",
    description:
      "Redeem your winning tickets instantly with our secure validation system.",
  },
  {
    icon: Plane,
    title: "Visa Services",
    description: "Streamlined visa application process with expert guidance.",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    description: "Book premium accommodations at exclusive partner rates.",
  },
  {
    icon: Trophy,
    title: "World Cup Betting",
    description: "Predict match outcomes and win Vividstream rewards.",
  },
];
