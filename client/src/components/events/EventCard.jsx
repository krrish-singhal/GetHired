import { FaCalendarAlt, FaTrophy, FaBuilding } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { RiPushpinFill } from "react-icons/ri";
import { FiEdit2, FiTrash2, FiArrowRight, FiSlash } from "react-icons/fi";
import { MdWarning, MdAccessTime } from "react-icons/md";
import { useToast } from "../../context/useToast";
import {
  TYPE_COLORS,
  TYPE_LABELS,
  TYPE_ICONS,
  MODE_ICONS,
  formatDate,
  daysLeft,
} from "../../data/eventConstants";

export default function EventCard({ event, isAdmin, onEdit, onDelete }) {
  const toast = useToast();
  const colors = TYPE_COLORS[event.type] || TYPE_COLORS.hackathon;
  const deadline = daysLeft(event.deadline);

  return (
    <div className="event-card group">
      <div className="event-card-img-wrap">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400"
          }
          alt={event.title}
          className="event-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400";
          }}
        />
        <span
          className="event-type-badge"
          style={{
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}
        >
          {TYPE_ICONS[event.type]} {TYPE_LABELS[event.type]}
        </span>
        <span className="event-mode-pill">
          {MODE_ICONS[event.mode]} {event.mode}
        </span>

        {isAdmin && (
          <div className="event-admin-actions">
            <button
              className="event-admin-btn edit"
              title="Edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(event);
              }}
            >
              <FiEdit2 size={13} />
            </button>
            <button
              className="event-admin-btn delete"
              title="Delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(event);
              }}
            >
              <FiTrash2 size={13} />
            </button>
          </div>
        )}
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p
          className="event-card-organizer"
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <FaBuilding size={12} />
          {event.organizer}
        </p>
        <div className="event-meta-row">
          <span className="event-meta-item">
            <FaCalendarAlt style={{ display: "inline", marginRight: 4 }} />
            {formatDate(event.date)}
          </span>
          <span className="event-meta-item">
            <FaRegClock style={{ display: "inline", marginRight: 4 }} />
            {event.duration}
          </span>
        </div>
        {event.venue && (
          <p className="event-venue">
            <RiPushpinFill style={{ display: "inline", marginRight: 4 }} />
            {event.venue}
          </p>
        )}
        <p className="event-description">{event.description}</p>
        <div className="event-tags">
          {(event.tags || []).slice(0, 3).map((tag) => (
            <span key={tag} className="event-tag">
              {tag}
            </span>
          ))}
        </div>
        {event.prize && (
          <div className="event-prize">
            <FaTrophy size={13} />
            <strong>{event.prize}</strong>
          </div>
        )}
        <div className="event-card-footer">
          {event.deadline && (
            <span
              className={`event-deadline ${deadline !== null && deadline <= 5 ? "deadline-urgent" : deadline !== null && deadline <= 14 ? "deadline-soon" : ""}`}
            >
              {deadline !== null && deadline < 0 ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <FiSlash size={12} /> Deadline passed
                </span>
              ) : deadline === 0 ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <MdWarning size={13} /> Due today!
                </span>
              ) : deadline !== null ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <MdAccessTime size={13} /> {deadline}d left
                </span>
              ) : (
                ""
              )}
            </span>
          )}
          {deadline !== null && deadline > 0 ? (
            event.registrationLink && event.registrationLink !== "#" ? (
              <a
                href={event.registrationLink}
                className="event-register-btn"
                target="_blank"
                rel="noreferrer"
              >
                Register Now <FiArrowRight size={13} />
              </a>
            ) : (
              <button
                className="event-register-btn"
                onClick={() =>
                  toast.info(
                    "Coming Soon!",
                    "Registration for this event will open soon. Stay tuned!",
                  )
                }
              >
                Register Now <FiArrowRight size={13} />
              </button>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
