import {
  FaGlobe,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMicrophone,
  FaUserTie,
  FaCode,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaTrophy,
} from "react-icons/fa";
import { RiShuffleLine } from "react-icons/ri";

export const TYPE_COLORS = {
  hackathon:     { bg: "#fff3e0", text: "#e65100", border: "#ffcc80" },
  workshop:      { bg: "#e8f5e9", text: "#2e7d32", border: "#a5d6a7" },
  placement:     { bg: "#e3f2fd", text: "#1565c0", border: "#90caf9" },
  speaker:       { bg: "#fce4ec", text: "#b71c1c", border: "#f48fb1" },
  guest_lecture: { bg: "#f3e5f5", text: "#6a1b9a", border: "#ce93d8" },
  competition:   { bg: "#fffde7", text: "#f57f17", border: "#fff176" },
  coding_contest:{ bg: "#e0f2f1", text: "#00695c", border: "#80cbc4" },
};

export const TYPE_LABELS = {
  hackathon:      "Hackathon",
  workshop:       "Workshop",
  placement:      "Placement Drive",
  speaker:        "Speaker Session",
  guest_lecture:  "Guest Lecture",
  competition:    "Competition",
  coding_contest: "Coding Contest",
};

export const MODE_ICONS = {
  Offline: <FaMapMarkerAlt size={11} />,
  Online:  <FaGlobe size={11} />,
  Hybrid:  <RiShuffleLine size={12} />,
};

export const TYPE_ICONS = {
  hackathon:      <FaCode size={11} />,
  workshop:       <FaChalkboardTeacher size={11} />,
  placement:      <FaBriefcase size={11} />,
  speaker:        <FaMicrophone size={11} />,
  guest_lecture:  <FaUserTie size={11} />,
  competition:    <FaTrophy size={11} />,
  coding_contest: <FaLaptopCode size={11} />,
};

export const EMPTY_FORM = {
  type: "hackathon",
  title: "",
  organizer: "",
  date: "",
  time: "",
  duration: "",
  mode: "Offline",
  venue: "",
  prize: "",
  tags: "",
  description: "",
  registrationLink: "#",
  deadline: "",
  image: "",
};

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysLeft(deadlineStr) {
  if (!deadlineStr) return null;
  return Math.ceil(
    (new Date(deadlineStr) - new Date()) / (1000 * 60 * 60 * 24),
  );
}
