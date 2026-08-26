import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { eventsData, filterOptions } from "../data/eventsData";
import { useAuth } from "../context/AuthContext";
import { getEvents } from "../services/api";
import { IoSearchSharp } from "react-icons/io5";
import { FiPlus, FiX, FiSearch } from "react-icons/fi";
import { TYPE_ICONS } from "../data/eventConstants";

import EventCard from "./events/EventCard";
import EventFormModal from "./events/EventFormModal";
import DeleteConfirm from "./events/DeleteConfirm";

// ─── Main Section ───────────────────────────────────────────────────────────────

export default function EventsSection({ previewMode = false }) {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(previewMode ? 3 : 9);
  const [editEvent, setEditEvent] = useState(null); // null = closed, event = editing
  const [addOpen, setAddOpen] = useState(false);
  const [deleteEvent_, setDeleteEvent_] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await getEvents();
      setEvents(data.length ? data : eventsData);
    } catch {
      setEvents(eventsData); // fallback to static data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filtered = useMemo(() => {
    let result = events;
    if (activeFilter !== "all")
      result = result.filter((e) => e.type === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          e.description.toLowerCase().includes(q),
      );
    }
    return [...result].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, activeFilter, searchQuery]);

  const visible = filtered.slice(0, visibleCount);

  const counts = useMemo(() => {
    const map = {};
    filterOptions.forEach((f) => {
      map[f.key] =
        f.key === "all"
          ? events.length
          : events.filter((e) => e.type === f.key).length;
    });
    return map;
  }, [events]);

  const handleSaved = () => {
    setEditEvent(null);
    setAddOpen(false);
    fetchEvents();
  };
  const handleDeleted = (id) => {
    setEvents((prev) => prev.filter((e) => (e._id || e.id) !== id));
    setDeleteEvent_(null);
  };

  return (
    <div className="events-page-bg">
      <section className="events-section" id="events">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="events-header">
          <div className="events-header-text">
            <span className="events-section-tag">Upcoming Events</span>
            <h2 className="events-section-title">
              Events &amp;{" "}
              <span className="events-title-accent">Opportunities</span>
            </h2>
            <p className="events-section-subtitle">
              Stay ahead of the curve — explore hackathons, workshops, placement
              drives, and more tailored for students like you.
            </p>
          </div>
          {!previewMode && (
            <div className="flex flex-col gap-3 items-end">
              {isAdmin && (
                <button
                  className="event-add-btn"
                  onClick={() => setAddOpen(true)}
                >
                  <FiPlus size={15} /> Add Event
                </button>
              )}
              <div className="events-search-wrap">
                <IoSearchSharp />
                <input
                  type="text"
                  className="events-search-input"
                  placeholder="Search events, topics, organizers…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(9);
                  }}
                />
                {searchQuery && (
                  <button
                    className="events-search-clear"
                    onClick={() => setSearchQuery("")}
                  >
                    <FiX size={13} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Filter Pills ──────────────────────────────── */}
        {!previewMode && (
          <div className="events-filters">
            {filterOptions.map((f) => (
              <button
                key={f.key}
                className={`events-filter-btn ${activeFilter === f.key ? "active" : ""}`}
                onClick={() => {
                  setActiveFilter(f.key);
                  setVisibleCount(9);
                }}
              >
                {TYPE_ICONS[f.key] && (
                  <span className="filter-icon">{TYPE_ICONS[f.key]}</span>
                )}
                <span>{f.label}</span>
                <span className="filter-count">{counts[f.key]}</span>
              </button>
            ))}
          </div>
        )}

        {/* ── Result meta ──────────────────────────────── */}
        {!previewMode && (
          <div className="events-result-meta">
            <span>
              Showing <strong>{Math.min(visibleCount, filtered.length)}</strong>{" "}
              of <strong>{filtered.length}</strong> events
              {activeFilter !== "all"
                ? ` in ${filterOptions.find((f) => f.key === activeFilter)?.label}`
                : ""}
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </span>
          </div>
        )}

        {/* ── Cards Grid ────────────────────────────────── */}
        {loading ? (
          <div className="events-loading">Loading events…</div>
        ) : filtered.length === 0 ? (
          <div className="events-empty">
            <FiSearch className="events-empty-icon" size={52} />
            <p>No events found. Try a different filter or search term.</p>
            <button
              className="events-filter-btn active"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="events-grid">
            {visible.map((event) => (
              <EventCard
                key={event._id || event.id}
                event={event}
                isAdmin={isAdmin}
                onEdit={setEditEvent}
                onDelete={setDeleteEvent_}
              />
            ))}
          </div>
        )}

        {/* ── Load More ─────────────────────────────────── */}
        {previewMode ? (
          <div className="events-load-more-wrap">
            <button
              className="events-load-more-btn"
              onClick={() => navigate("/events")}
            >
              View All Events
            </button>
          </div>
        ) : (
          visibleCount < filtered.length && (
            <div className="events-load-more-wrap">
              <button
                className="events-load-more-btn"
                onClick={() => setVisibleCount((c) => c + 9)}
              >
                Load More Events ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )
        )}

        {/* ── Modals ────────────────────────────────────── */}
        {addOpen && (
          <EventFormModal
            onClose={() => setAddOpen(false)}
            onSaved={handleSaved}
          />
        )}
        {editEvent && (
          <EventFormModal
            initial={editEvent}
            onClose={() => setEditEvent(null)}
            onSaved={handleSaved}
          />
        )}
        {deleteEvent_ && (
          <DeleteConfirm
            event={deleteEvent_}
            onClose={() => setDeleteEvent_(null)}
            onDeleted={handleDeleted}
          />
        )}
      </section>
    </div>
  );
}
