import * as React from "react"
import {
  makeStyles,
  Subtitle2,
  Tab,
  TabList,
  tokens,
  SelectTabData,
  SelectTabEvent,
} from "@fluentui/react-components"
import { Desktop20Regular, Phone20Regular } from "@fluentui/react-icons"
import { IColor } from "../models/IColors"

export interface DashboardPreviewProps {
  colors: IColor[]
}

type ViewMode = "desktop" | "mobile"

const useStyles = makeStyles({
  header: {
    marginBottom: "0.6rem",
  },
  tabList: {
    marginBottom: "1.2rem",
  },
  previewWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  // Browser frame
  browserFrame: {
    width: "100%",
    maxWidth: "800px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 6px 28px rgba(0,0,0,0.18)",
    border: "1px solid #d0d0d0",
  },
  browserChrome: {
    backgroundColor: "#e8e8e8",
    padding: "9px 14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    borderBottom: "1px solid #c8c8c8",
  },
  browserUrlBar: {
    flex: 1,
    height: "18px",
    borderRadius: "9px",
    backgroundColor: "#f5f5f5",
    marginLeft: "10px",
    border: "1px solid #d0d0d0",
  },
  // Phone frame
  phoneWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  phoneFrame: {
    width: "230px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
    border: "3px solid #333",
  },
})

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  colors,
}) => {
  const styles = useStyles()
  const [viewMode, setViewMode] = React.useState<ViewMode>("desktop")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(800)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Below 520px the desktop layout is too cramped — force mobile
  const isNarrow = containerWidth < 520
  React.useEffect(() => {
    if (isNarrow) setViewMode("mobile")
  }, [isNarrow])

  // At medium width use a slimmer sidebar (520–680px range)
  const isMedium = containerWidth >= 520 && containerWidth < 680

  const handleTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
    setViewMode(data.value as ViewMode)
  }

  const primary = colors[0]?.color ?? "#0078d4"
  const secondary = colors[1]?.color ?? "#2b88d8"
  const accent = colors[2]?.color ?? "#e81123"
  const success = colors[3]?.color ?? "#107c10"
  const warning = colors[4]?.color ?? "#ffb900"
  const error = colors[5]?.color ?? "#d13438"
  const info = colors[6]?.color ?? "#005a9e"

  const statCards = [
    { label: "Active Users", value: "1,284", color: primary },
    { label: "Completed", value: "847", color: success },
    { label: "Pending", value: "63", color: warning },
  ]

  const listItems = [
    { title: "Marketing Campaign", sub: "Updated 1 hour ago", dot: info },
    { title: "Q3 Analysis Report", sub: "Updated 3 hours ago", dot: warning },
    { title: "Customer Feedback", sub: "Updated 5 hours ago", dot: error },
  ]

  const navItems = ["Home", "Analytics", "Teams", "Settings"]

  // ── Shared sub-components ──────────────────────────────────────────────────

  const AppNavbar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      style={{
        backgroundColor: primary,
        padding: mobile ? "10px 14px" : "11px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      {/* Logo + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <div
          style={{
            width: mobile ? 20 : 24,
            height: mobile ? 20 : 24,
            borderRadius: "6px",
            backgroundColor: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.85)",
            }}
          />
        </div>
        <span
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: mobile ? 11 : 13,
            letterSpacing: "0.3px",
          }}
        >
          WorkSpace
        </span>
      </div>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        {!mobile && (
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 10 }}>
            Jane Smith
          </span>
        )}
        <div
          style={{
            width: mobile ? 22 : 26,
            height: mobile ? 22 : 26,
            borderRadius: "50%",
            backgroundColor: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>
            JS
          </span>
        </div>
      </div>
    </div>
  )

  const StatCard = ({
    label,
    value,
    color,
    small = false,
  }: {
    label: string
    value: string
    color: string
    small?: boolean
  }) => (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: small ? 8 : 10,
        border: "1px solid #e8e8e8",
        padding: small ? "8px 10px" : "12px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontSize: small ? 8 : 9,
            color: "#888",
            marginBottom: small ? 3 : 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: small ? 14 : 17,
            fontWeight: 700,
            color: "#1a1a1a",
          }}
        >
          {value}
        </div>
      </div>
      <div
        style={{
          width: small ? 24 : 30,
          height: small ? 24 : 30,
          borderRadius: "7px",
          backgroundColor: `${color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: small ? 14 : 18,
            height: small ? 14 : 18,
            borderRadius: "4px",
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )

  const ListItem = ({
    title,
    sub,
    dot,
    small = false,
  }: {
    title: string
    sub: string
    dot: string
    small?: boolean
  }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: small ? 7 : 10,
        padding: small ? "7px 10px" : "9px 14px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          width: small ? 7 : 8,
          height: small ? 7 : 8,
          borderRadius: "50%",
          backgroundColor: dot,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: small ? 9 : 10,
            fontWeight: 600,
            color: "#1a1a1a",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: small ? 7 : 8, color: "#999", marginTop: 1 }}>
          {sub}
        </div>
      </div>
      <div
        style={{
          border: `1px solid ${dot}`,
          borderRadius: "5px",
          padding: small ? "2px 6px" : "3px 8px",
          fontSize: small ? 7 : 8,
          color: dot,
          fontWeight: 600,
          flexShrink: 0,
          backgroundColor: "white",
        }}
      >
        Open
      </div>
    </div>
  )

  // ── Desktop Dashboard ──────────────────────────────────────────────────────

  const sidebarWidth = isMedium ? 110 : 155
  const contentPadding = isMedium ? "14px 14px" : "18px 20px"

  const DesktopDashboard = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppNavbar />
      <div style={{ display: "flex", flex: 1, backgroundColor: "#f2f4f7" }}>
        {/* Sidebar */}
        <div
          style={{
            width: sidebarWidth,
            backgroundColor: "white",
            borderRight: "1px solid #e8e8e8",
            padding: "16px 0",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 8,
              color: "#aaa",
              fontWeight: 600,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              padding: "0 14px",
              marginBottom: 10,
            }}
          >
            Navigation
          </div>
          {navItems.map((item, i) => (
            <div
              key={item}
              style={{
                margin: i === 0 ? "0 8px 4px" : "0 8px 4px",
                borderRadius: "7px",
                backgroundColor: i === 0 ? primary : "transparent",
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "3px",
                  backgroundColor:
                    i === 0 ? "rgba(255,255,255,0.35)" : "#d0d0d0",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? "white" : "#666",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: contentPadding, overflow: "hidden" }}>
          {/* Page header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>
              Overview
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{
                  border: `1.5px solid ${accent}`,
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 9,
                  fontWeight: 600,
                  color: accent,
                  backgroundColor: "white",
                }}
              >
                Export
              </div>
              <div
                style={{
                  backgroundColor: primary,
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 9,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Add Record
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {statCards.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Recent activity */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              border: "1px solid #e8e8e8",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "11px 14px",
                fontSize: 10,
                fontWeight: 700,
                color: "#1a1a1a",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              Recent Activity
            </div>
            {listItems.map((item) => (
              <ListItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // ── Mobile Dashboard ───────────────────────────────────────────────────────

  const MobileDashboard = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f2f4f7",
      }}
    >
      <AppNavbar mobile />

      {/* Content */}
      <div style={{ padding: "12px 10px", flex: 1 }}>
        {/* Page title */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: 10,
          }}
        >
          Overview
        </div>

        {/* 2x2 stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {[...statCards, { label: "Issues", value: "7", color: error }].map(
            (s) => (
              <StatCard key={s.label} {...s} small />
            ),
          )}
        </div>

        {/* Recent activity */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            border: "1px solid #e8e8e8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "8px 10px",
              fontSize: 9,
              fontWeight: 700,
              color: "#1a1a1a",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            Recent Activity
          </div>
          {listItems.map((item) => (
            <ListItem key={item.title} {...item} small />
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          backgroundColor: primary,
          padding: "10px 6px 12px",
          display: "flex",
          justifyContent: "space-around",
          flexShrink: 0,
        }}
      >
        {navItems.map((item, i) => (
          <div
            key={item}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "6px",
                backgroundColor:
                  i === 0 ? "rgba(255,255,255,0.25)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "2px",
                  backgroundColor: i === 0 ? "white" : "rgba(255,255,255,0.5)",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 7,
                color: i === 0 ? "white" : "rgba(255,255,255,0.6)",
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef}>
      <Subtitle2 className={styles.header}>Live Preview</Subtitle2>
      <TabList
        selectedValue={viewMode}
        onTabSelect={handleTabSelect}
        className={styles.tabList}
      >
        {!isNarrow && (
          <Tab value='desktop' icon={<Desktop20Regular />}>
            Desktop
          </Tab>
        )}
        <Tab value='mobile' icon={<Phone20Regular />}>
          Mobile
        </Tab>
      </TabList>

      <div className={styles.previewWrapper}>
        {viewMode === "desktop" ? (
          <div className={styles.browserFrame}>
            <div className={styles.browserChrome}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: c,
                    }}
                  />
                ))}
              </div>
              <div className={styles.browserUrlBar} />
            </div>
            {DesktopDashboard}
          </div>
        ) : (
          <div className={styles.phoneWrapper}>
            <div className={styles.phoneFrame}>{MobileDashboard}</div>
          </div>
        )}
      </div>
    </div>
  )
}
