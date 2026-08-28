(() => {
  const NETWORK_REGIONS = [
    "us-east-1",
    "us-west-2",
    "eu-west-1",
    "eu-central-1",
    "ap-southeast-1",
  ];

  const SEVERITY_ORDER = { none: 0, low: 1, medium: 2, high: 3, critical: 4 };
  const SEVERITY_COLOR = {
    critical: "#DC2626",
    high: "#EA580C",
    medium: "#D97706",
    low: "#3B82F6",
    none: "#94A3B8",
  };

  const NETWORK_FALLBACK_PAYLOAD = {
    data_source: "demo",
    region: "us-east-1",
    metrics: {
      entities: 1248,
      internet_exposed: 27,
      vpcs: 12,
      subnets: 39,
      sgs: 91,
      internet_exposed_paths: 43,
      entities_delta: 8,
      internet_exposed_delta: 17,
      vpcs_delta: 0,
      internet_exposed_paths_delta: 22,
    },
    vpcs: [
      { id: "prod-vpc", label: "prod-vpc", cidr: "10.0.0.0/16" },
      { id: "shared-services-vpc", label: "shared-services-vpc", cidr: "10.1.0.0/16" },
      { id: "dev-vpc", label: "dev-vpc", cidr: "10.2.0.0/16" },
      { id: "data-vpc", label: "data-vpc", cidr: "10.3.0.0/16" },
      { id: "mgmt-vpc", label: "mgmt-vpc", cidr: "10.4.0.0/16" },
    ],
    nodes: [
      { id: "internet", label: "Internet", kind: "internet", exposure: "internet" },
      { id: "igw-main", label: "internet-gateway", kind: "igw", exposure: "internet" },

      { id: "subnet-prod-pub-a", label: "public-a", kind: "subnet", vpc: "prod-vpc", sub: "10.0.1.0/24", exposure: "internet" },
      { id: "subnet-prod-pub-b", label: "public-b", kind: "subnet", vpc: "prod-vpc", sub: "10.0.2.0/24", exposure: "internet" },
      { id: "subnet-prod-app-a", label: "app-a", kind: "subnet", vpc: "prod-vpc", sub: "10.0.3.0/24", exposure: "internal" },
      { id: "subnet-prod-data-a", label: "data-a", kind: "subnet", vpc: "prod-vpc", sub: "10.0.4.0/24", exposure: "internal" },
      { id: "prod-web-1", label: "web-1", kind: "instance", vpc: "prod-vpc", sub: "subnet-prod-pub-a", exposure: "internet", risk_score: 93 },
      { id: "prod-web-2", label: "web-2", kind: "instance", vpc: "prod-vpc", sub: "subnet-prod-pub-b", exposure: "internet", risk_score: 85 },
      { id: "prod-app-1", label: "app-1", kind: "instance", vpc: "prod-vpc", sub: "subnet-prod-app-a", exposure: "internal", risk_score: 76 },
      { id: "prod-db-1", label: "prod-db", kind: "rds", vpc: "prod-vpc", sub: "subnet-prod-data-a", exposure: "internal", risk_score: 68 },
      { id: "prod-sg-public", label: "sg-public 0.0.0.0/0", kind: "sg", vpc: "prod-vpc", sub: "subnet-prod-pub-a", exposure: "internet", risk_score: 96 },

      { id: "subnet-shared-a", label: "shared-services-a", kind: "subnet", vpc: "shared-services-vpc", sub: "10.1.1.0/24", exposure: "internal" },
      { id: "subnet-shared-b", label: "shared-services-b", kind: "subnet", vpc: "shared-services-vpc", sub: "10.1.2.0/24", exposure: "internal" },
      { id: "nat-shared", label: "nat-instance", kind: "nat", vpc: "shared-services-vpc", sub: "subnet-shared-b", exposure: "internal", risk_score: 43 },
      { id: "bastion-shared", label: "bastion", kind: "instance", vpc: "shared-services-vpc", sub: "subnet-shared-a", exposure: "internal", risk_score: 39 },

      { id: "subnet-dev-a", label: "dev-public-a", kind: "subnet", vpc: "dev-vpc", sub: "10.2.1.0/24", exposure: "internet" },
      { id: "subnet-dev-b", label: "dev-db-a", kind: "subnet", vpc: "dev-vpc", sub: "10.2.2.0/24", exposure: "internal" },
      { id: "dev-web", label: "dev-web", kind: "instance", vpc: "dev-vpc", sub: "subnet-dev-a", exposure: "internet", risk_score: 75 },
      { id: "dev-db", label: "dev-db", kind: "rds", vpc: "dev-vpc", sub: "subnet-dev-b", exposure: "internal", risk_score: 64 },
      { id: "dev-sg", label: "dev-sg wide ingress", kind: "sg", vpc: "dev-vpc", sub: "subnet-dev-a", exposure: "internet", risk_score: 82 },

      { id: "subnet-data-a", label: "analytics-a", kind: "subnet", vpc: "data-vpc", sub: "10.3.1.0/24", exposure: "internal" },
      { id: "subnet-data-b", label: "warehouse-a", kind: "subnet", vpc: "data-vpc", sub: "10.3.2.0/24", exposure: "internal" },
      { id: "analytics-db", label: "analytics-db", kind: "rds", vpc: "data-vpc", sub: "subnet-data-a", exposure: "internal", risk_score: 42 },
      { id: "warehouse-db", label: "data-warehouse", kind: "rds", vpc: "data-vpc", sub: "subnet-data-b", exposure: "internal", risk_score: 30 },

      { id: "subnet-mgmt-a", label: "mgmt-a", kind: "subnet", vpc: "mgmt-vpc", sub: "10.4.1.0/24", exposure: "internal" },
      { id: "subnet-mgmt-b", label: "mgmt-b", kind: "subnet", vpc: "mgmt-vpc", sub: "10.4.2.0/24", exposure: "internal" },
      { id: "jumpbox", label: "jumpbox", kind: "instance", vpc: "mgmt-vpc", sub: "subnet-mgmt-a", exposure: "internal", risk_score: 25 },
      { id: "ssm-endpoint", label: "ssm-endpoint", kind: "other", vpc: "mgmt-vpc", sub: "subnet-mgmt-b", exposure: "internal", risk_score: 14 },
    ],
    edges: [
      { source: "internet", target: "igw-main", kind: "direct", risk: "critical" },
      { source: "igw-main", target: "prod-web-1", kind: "direct", risk: "critical" },
      { source: "igw-main", target: "prod-web-2", kind: "direct", risk: "critical" },
      { source: "prod-web-1", target: "prod-app-1", kind: "direct", risk: "high" },
      { source: "prod-app-1", target: "prod-db-1", kind: "direct", risk: "high" },
      { source: "prod-app-1", target: "nat-shared", kind: "peer", risk: "medium" },
      { source: "nat-shared", target: "dev-web", kind: "peer", risk: "medium" },
      { source: "dev-web", target: "dev-db", kind: "direct", risk: "high" },
      { source: "prod-db-1", target: "analytics-db", kind: "peer", risk: "medium" },
      { source: "jumpbox", target: "prod-app-1", kind: "peer", risk: "low" },
    ],
    top_concerns: [
      {
        id: "tc-1",
        entity_id: "prod-web-1",
        title: "Internet-facing EC2 instance",
        meta: "1 instance with public IP exposed to the internet",
        severity: "critical",
        score: 100,
      },
      {
        id: "tc-2",
        entity_id: "prod-db-1",
        title: "Database reachable from internet path",
        meta: "2 databases can be reached from internet-facing resources",
        severity: "high",
        score: 92,
      },
      {
        id: "tc-3",
        entity_id: "prod-sg-public",
        title: "Overly permissive security group",
        meta: "3 security groups allow access from 0.0.0.0/0",
        severity: "high",
        score: 88,
      },
      {
        id: "tc-4",
        entity_id: "dev-sg",
        title: "High-risk attack path",
        meta: "8 attack paths from internet to high-value resources",
        severity: "medium",
        score: 73,
      },
      {
        id: "tc-5",
        entity_id: "nat-shared",
        title: "Unrestricted outbound access",
        meta: "5 security groups allow unrestricted outbound traffic",
        severity: "low",
        score: 61,
      },
    ],
  };

  const state = {
    region: "us-east-1",
    loaded: false,
    loading: false,
    payload: NETWORK_FALLBACK_PAYLOAD,
    requestNonce: 0,
    styleInstalled: false,
  };

  function installStyles() {
    if (state.styleInstalled) return;
    state.styleInstalled = true;
    const style = document.createElement("style");
    style.textContent = `
      .graph-wrap.network-mode{background:#f8fafc;border-color:#dbe4ef}
      .graph-wrap.network-mode .graph-toolbar{border-bottom-color:#dbe4ef;background:#fff}
      .graph-wrap.network-mode .gtab{color:#475569}
      .graph-wrap.network-mode .gtab.on{background:#e0f2fe;border-color:#7dd3fc;color:#0f172a}
      .graph-wrap.network-mode .gtab:hover{background:#f1f5f9}
      .graph-canvas.network-mode{overflow:auto;background:#f8fafc}
      .graph-canvas.network-mode::-webkit-scrollbar{width:8px}
      .graph-canvas.network-mode::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px}
      .graph-right.network-mode{padding:0}
      .net-page{padding:12px 12px 14px;color:#0f172a;font-family:var(--body)}
      .net-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px}
      .net-title{margin:0;font-size:29px;font-weight:800;line-height:1}
      .net-sub{margin:6px 0 0;font-size:12px;color:#64748b}
      .net-controls{display:flex;align-items:center;gap:8px}
      .net-region{height:32px;padding:0 10px;border-radius:8px;border:1px solid #dbe4ef;background:#fff;color:#0f172a;font-size:12px}
      .net-refresh{height:32px;padding:0 12px;border-radius:8px;border:1px solid #dbe4ef;background:#fff;color:#0f172a;cursor:pointer;font-size:12px;font-weight:600}
      .net-refresh:hover{background:#f8fafc}
      .net-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:12px}
      .net-kpi{border:1px solid #dbe4ef;border-top-width:3px;border-radius:10px;background:#fff;padding:10px 12px;box-shadow:0 1px 4px rgba(15,23,42,.04)}
      .net-kpi-l{margin:0 0 4px;font-size:10px;letter-spacing:.1em;font-weight:700;text-transform:uppercase}
      .net-kpi-v{margin:0;font-size:33px;line-height:1.02;font-weight:900}
      .net-kpi-s{margin:4px 0 0;font-size:11px;color:#64748b}
      .net-topology-card{border:1px solid #dbe4ef;border-radius:12px;background:#fff;overflow:hidden;box-shadow:0 1px 4px rgba(15,23,42,.04)}
      .net-topology-h{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #eef2f7}
      .net-topology-title{font-size:14px;font-weight:700;margin:0}
      .net-legend{display:flex;align-items:center;gap:11px;flex-wrap:wrap;font-size:10px;font-family:var(--mono);color:#64748b}
      .net-leg{display:flex;align-items:center;gap:4px}
      .net-leg .dot{width:8px;height:8px;border-radius:999px;display:inline-block}
      .net-topology-viz{height:415px;padding:8px}
      .net-topology-viz svg{width:100%;height:100%;display:block}
      .net-topology-footer{padding:8px 12px;border-top:1px solid #eef2f7}
      .net-topology-cta{border:0;background:none;color:#2563eb;cursor:pointer;font-weight:600;font-size:12px;padding:0}
      .network-side-panel{display:flex;flex-direction:column;gap:10px;height:100%;padding:0}
      .net-concern-card{border:1px solid #dbe4ef;border-radius:12px;background:#fff;box-shadow:0 1px 4px rgba(15,23,42,.04);overflow:hidden}
      .net-concern-h{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #eef2f7}
      .net-concern-h h4{margin:0;font-size:15px}
      .net-concern-h button{border:0;background:none;color:#2563eb;font-size:11px;font-weight:600;cursor:pointer}
      .net-concern-list{list-style:none;margin:0;padding:2px 0}
      .net-concern-item{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #f1f5f9}
      .net-concern-item:first-child{border-top:0}
      .net-concern-text{min-width:0;flex:1}
      .net-concern-title{margin:0;font-size:12px;font-weight:700;line-height:1.3}
      .net-concern-meta{margin:4px 0 0;font-size:10px;line-height:1.4;color:#64748b}
      .net-sev{display:inline-flex;align-items:center;border-radius:20px;padding:2px 7px;font-size:9px;font-family:var(--mono);font-weight:700;letter-spacing:.08em;white-space:nowrap}
      .net-sev-critical{color:#b91c1c;background:#fee2e2}
      .net-sev-high{color:#c2410c;background:#ffedd5}
      .net-sev-medium{color:#92400e;background:#fef3c7}
      .net-sev-low{color:#1d4ed8;background:#dbeafe}
      .net-source{margin-top:auto;border:1px solid #dbe4ef;border-radius:10px;background:#fff;padding:10px 12px;font-size:10px;font-family:var(--mono);line-height:1.6;color:#64748b}
      .net-loading{display:flex;align-items:center;justify-content:center;height:100%;font-family:var(--mono);font-size:12px;color:#475569}
      .net-empty{display:flex;align-items:center;justify-content:center;height:260px;border:1px dashed #cbd5e1;border-radius:10px;background:#f8fafc;color:#64748b;font-size:12px}
      @media (max-width: 1240px){.net-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media (max-width: 980px){.net-head{flex-direction:column;align-items:flex-start}.net-controls{width:100%}.net-region{flex:1}}
    `;
    document.head.appendChild(style);
  }

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function asNumber(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }

  function normalizeExposure(value) {
    const v = String(value ?? "internal").toLowerCase();
    if (v.includes("internet")) return "internet";
    if (v.includes("cross")) return "cross_account";
    return "internal";
  }

  function normalizeKind(value) {
    const v = String(value ?? "").toLowerCase();
    if (v === "subnet" || v.includes("subnet")) return "subnet";
    if (v === "sg" || v.includes("security_group") || v.includes("security group")) return "sg";
    if (v === "alb" || v === "nlb" || v === "lb" || v.includes("load_balancer") || v.includes("load balancer")) return "alb";
    if (v === "igw" || v.includes("internet_gateway")) return "igw";
    if (v === "nat" || v.includes("nat_gateway")) return "nat";
    if (v === "peer" || v.includes("peering") || v.includes("vpc_peering")) return "peer";
    if (v.includes("rds") || v.includes("database") || v.includes("db")) return "rds";
    if (v.includes("ec2") || v.includes("instance") || v.includes("compute")) return "instance";
    if (v.includes("lambda")) return "lambda";
    if (v.includes("internet")) return "internet";
    return "other";
  }

  function severityFromScore(score) {
    const n = asNumber(score);
    if (n == null) return "none";
    if (n >= 85) return "critical";
    if (n >= 65) return "high";
    if (n >= 40) return "medium";
    if (n >= 20) return "low";
    return "none";
  }

  function normalizeSeverity(value, fallbackScore) {
    const sev = String(value ?? "").toLowerCase();
    if (sev === "critical" || sev === "high" || sev === "medium" || sev === "low" || sev === "none") return sev;
    return severityFromScore(fallbackScore);
  }

  function mergeSeverity(a, b) {
    return SEVERITY_ORDER[b] > SEVERITY_ORDER[a] ? b : a;
  }

  function extractMatch(text, regex) {
    if (!text) return "";
    const m = String(text).match(regex);
    return m ? m[1] : "";
  }

  function normalizeNode(rawNode, idx) {
    const id = String(rawNode.id ?? rawNode.node_id ?? rawNode.entity_id ?? `node-${idx}`);
    const label = String(rawNode.label ?? rawNode.name ?? rawNode.title ?? id);
    const vpc =
      String(rawNode.vpc ?? rawNode.vpc_id ?? rawNode.vpcId ?? extractMatch(label, /(vpc-[a-z0-9-]+)/i) ?? "").trim();
    const sub =
      String(
        rawNode.sub ??
          rawNode.subnet ??
          rawNode.subnet_id ??
          rawNode.subnetId ??
          rawNode.cidr ??
          extractMatch(label, /(subnet-[a-z0-9-]+)/i) ??
          ""
      ).trim();
    const riskScore = asNumber(rawNode.risk_score ?? rawNode.score ?? rawNode.riskScore);
    return {
      id,
      label,
      kind: normalizeKind(rawNode.kind ?? rawNode.type ?? rawNode.provider_type ?? rawNode.canonical_type),
      vpc,
      sub,
      exposure: normalizeExposure(rawNode.exposure ?? rawNode.exposure_type ?? rawNode.scope),
      risk_score: riskScore,
      severity: normalizeSeverity(rawNode.severity ?? rawNode.risk ?? rawNode.band, riskScore),
    };
  }

  function normalizeEdge(rawEdge) {
    const source = String(rawEdge.source ?? rawEdge.a ?? rawEdge.from ?? rawEdge.from_id ?? rawEdge.source_id ?? "");
    const target = String(rawEdge.target ?? rawEdge.b ?? rawEdge.to ?? rawEdge.to_id ?? rawEdge.target_id ?? "");
    if (!source || !target) return null;
    return {
      source,
      target,
      kind: String(rawEdge.kind ?? rawEdge.type ?? "direct").toLowerCase(),
      severity: normalizeSeverity(rawEdge.risk ?? rawEdge.severity ?? rawEdge.band),
    };
  }

  function findNetworkObject(obj, depth = 0) {
    if (!obj || typeof obj !== "object" || depth > 6) return null;
    const candidate = obj;
    const hasCoreArrays =
      (Array.isArray(candidate.nodes) && Array.isArray(candidate.edges)) ||
      (Array.isArray(candidate.vpcs) && (candidate.metrics || candidate.top_concerns));
    if (hasCoreArrays) return candidate;
    const keys = ["network", "network_macro_graph", "macro_graph", "topology", "data", "result", "payload", "scan", "status", "response"];
    for (const key of keys) {
      if (candidate[key] && typeof candidate[key] === "object") {
        const hit = findNetworkObject(candidate[key], depth + 1);
        if (hit) return hit;
      }
    }
    for (const value of Object.values(candidate)) {
      if (value && typeof value === "object") {
        const hit = findNetworkObject(value, depth + 1);
        if (hit) return hit;
      }
    }
    return null;
  }

  function normalizeConcerns(rawConcerns, nodes) {
    const list = [];
    for (let i = 0; i < (rawConcerns ?? []).length; i += 1) {
      const c = rawConcerns[i] ?? {};
      const score = asNumber(c.score ?? c.risk_score ?? c.weight);
      const severity = normalizeSeverity(c.severity ?? c.risk ?? c.band, score);
      const title = String(c.title ?? c.label ?? c.name ?? c.concern ?? "").trim();
      if (!title) continue;
      list.push({
        id: String(c.id ?? `concern-${i}`),
        entity_id: c.entity_id ? String(c.entity_id) : "",
        title,
        meta: String(c.meta ?? c.detail ?? c.description ?? "Needs review").trim(),
        severity,
        score,
      });
    }
    if (list.length) {
      return list
        .sort((a, b) => {
          const bySev = SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity];
          if (bySev !== 0) return bySev;
          return (b.score ?? 0) - (a.score ?? 0);
        })
        .slice(0, 6);
    }

    const derived = nodes
      .filter((n) => n.exposure === "internet" || SEVERITY_ORDER[n.severity] >= SEVERITY_ORDER.high)
      .sort((a, b) => {
        const bySev = SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity];
        if (bySev !== 0) return bySev;
        return (b.risk_score ?? 0) - (a.risk_score ?? 0);
      })
      .slice(0, 6)
      .map((node, idx) => ({
        id: `derived-${idx}`,
        entity_id: node.id,
        title: node.exposure === "internet" ? `Internet-facing ${node.kind}` : `High-risk ${node.kind}`,
        meta: `${node.label}${node.vpc ? ` in ${node.vpc}` : ""}`,
        severity: node.severity === "none" ? "medium" : node.severity,
        score: node.risk_score ?? null,
      }));

    return derived;
  }

  function normalizeNetworkPayload(rawPayload) {
    const graph = findNetworkObject(rawPayload);
    if (!graph) return null;
    const nodes = (graph.nodes ?? graph.entities ?? []).map(normalizeNode).filter((n) => n.id);
    const edges = (graph.edges ?? graph.connections ?? []).map(normalizeEdge).filter(Boolean);
    const vpcsRaw = graph.vpcs ?? [];
    const vpcs = (Array.isArray(vpcsRaw) ? vpcsRaw : [])
      .map((v, idx) => {
        if (typeof v === "string") return { id: v, label: v, cidr: "" };
        const id = String(v.id ?? v.vpc ?? `vpc-${idx}`);
        return {
          id,
          label: String(v.label ?? v.name ?? id),
          cidr: String(v.cidr ?? v.range ?? ""),
        };
      })
      .filter((v) => v.id);

    const inferredVpcIds = new Set(vpcs.map((v) => v.id));
    for (const n of nodes) {
      if (n.vpc) inferredVpcIds.add(n.vpc);
    }

    const metricsRaw = graph.metrics ?? rawPayload.metrics ?? {};
    const metrics = {
      entities: asNumber(metricsRaw.entities) ?? nodes.length,
      internet_exposed:
        asNumber(metricsRaw.internet_exposed) ?? nodes.filter((n) => n.exposure === "internet").length,
      vpcs: asNumber(metricsRaw.vpcs) ?? inferredVpcIds.size,
      subnets: asNumber(metricsRaw.subnets) ?? nodes.filter((n) => n.kind === "subnet").length,
      sgs: asNumber(metricsRaw.sgs) ?? nodes.filter((n) => n.kind === "sg").length,
      internet_exposed_paths:
        asNumber(metricsRaw.internet_exposed_paths) ??
        asNumber(metricsRaw.attack_paths_in_network) ??
        edges.filter((e) => e.severity === "critical" || e.severity === "high").length,
      entities_delta: asNumber(metricsRaw.entities_delta),
      internet_exposed_delta: asNumber(metricsRaw.internet_exposed_delta),
      vpcs_delta: asNumber(metricsRaw.vpcs_delta),
      internet_exposed_paths_delta:
        asNumber(metricsRaw.internet_exposed_paths_delta) ??
        asNumber(metricsRaw.attack_paths_in_network_delta),
    };

    const concerns = normalizeConcerns(graph.top_concerns ?? rawPayload.top_concerns ?? [], nodes);
    return {
      region: String(graph.region ?? rawPayload.region ?? state.region ?? "us-east-1"),
      data_source: String(graph.data_source ?? rawPayload.data_source ?? "scan"),
      metrics,
      vpcs,
      nodes,
      edges,
      top_concerns: concerns,
    };
  }

  function buildArchitectureModel(payload) {
    const concernSeverity = new Map();
    for (const concern of payload.top_concerns ?? []) {
      if (!concern.entity_id) continue;
      const prev = concernSeverity.get(concern.entity_id) ?? "none";
      concernSeverity.set(concern.entity_id, mergeSeverity(prev, concern.severity ?? "none"));
    }

    const vpcMap = new Map();
    const ensureVpc = (id, seed) => {
      if (!id) return null;
      if (!vpcMap.has(id)) {
        vpcMap.set(id, {
          id,
          label: seed?.label || id,
          cidr: seed?.cidr || "",
          severity: "none",
          internetExposed: 0,
          subnets: new Map(),
          entityCount: 0,
        });
      }
      return vpcMap.get(id);
    };

    for (const vpc of payload.vpcs ?? []) ensureVpc(vpc.id, vpc);

    const nodeById = new Map(payload.nodes.map((n) => [n.id, n]));
    const nodeVpc = new Map();
    for (const node of payload.nodes ?? []) {
      if (!node.vpc) continue;
      const vpc = ensureVpc(node.vpc);
      if (!vpc) continue;
      nodeVpc.set(node.id, node.vpc);

      let subKey = node.sub || (node.kind === "subnet" ? node.id : "shared");
      if (!subKey) subKey = "shared";
      if (!vpc.subnets.has(subKey)) {
        const fallbackLabel = subKey.startsWith("subnet-") ? subKey : node.kind === "subnet" ? node.label : "shared-services";
        vpc.subnets.set(subKey, {
          id: subKey,
          label: fallbackLabel,
          cidr: extractMatch(node.sub || node.label, /(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/),
          entities: [],
        });
      }
      const sub = vpc.subnets.get(subKey);
      if (node.kind !== "subnet") {
        sub.entities.push({
          id: node.id,
          label: node.label,
          kind: node.kind,
          severity: mergeSeverity(node.severity, concernSeverity.get(node.id) ?? "none"),
        });
        vpc.entityCount += 1;
      } else if (!sub.cidr) {
        sub.cidr = extractMatch(node.sub || node.label, /(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/);
      }

      if (node.exposure === "internet") vpc.internetExposed += 1;
      const nodeSeverity = mergeSeverity(node.severity, concernSeverity.get(node.id) ?? "none");
      vpc.severity = mergeSeverity(vpc.severity, nodeSeverity);
    }

    const vpcs = [...vpcMap.values()]
      .map((vpc) => {
        const subnets = [...vpc.subnets.values()]
          .map((sub) => ({
            ...sub,
            entities: sub.entities
              .sort((a, b) => SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity])
              .slice(0, 3),
          }))
          .sort((a, b) => b.entities.length - a.entities.length || a.label.localeCompare(b.label));
        return { ...vpc, subnets };
      })
      .sort((a, b) => {
        const bySev = SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity];
        if (bySev !== 0) return bySev;
        if (b.internetExposed !== a.internetExposed) return b.internetExposed - a.internetExposed;
        return b.entityCount - a.entityCount;
      })
      .slice(0, 5);

    const shownVpcIds = new Set(vpcs.map((v) => v.id));
    const links = new Map();
    for (const edge of payload.edges ?? []) {
      const sourceNode = nodeById.get(edge.source);
      const targetNode = nodeById.get(edge.target);
      const sourceVpc = sourceNode?.vpc || nodeVpc.get(edge.source) || "";
      const targetVpc = targetNode?.vpc || nodeVpc.get(edge.target) || "";
      if (!sourceVpc || !targetVpc || sourceVpc === targetVpc) continue;
      if (!shownVpcIds.has(sourceVpc) || !shownVpcIds.has(targetVpc)) continue;
      const key = [sourceVpc, targetVpc].sort().join("::");
      const current = links.get(key) ?? { from: sourceVpc, to: targetVpc, count: 0, severity: "none" };
      current.count += 1;
      current.severity = mergeSeverity(current.severity, edge.severity ?? "low");
      links.set(key, current);
    }

    return {
      region: payload.region,
      data_source: payload.data_source,
      metrics: payload.metrics,
      concerns: (payload.top_concerns ?? []).slice(0, 6),
      vpcs,
      links: [...links.values()],
    };
  }

  function kindTag(kind) {
    switch (kind) {
      case "instance":
        return "EC2";
      case "sg":
        return "SG";
      case "alb":
        return "ALB";
      case "rds":
        return "RDS";
      case "nat":
        return "NAT";
      case "lambda":
        return "LAMBDA";
      default:
        return "NODE";
    }
  }

  function fmtDelta(value) {
    if (value == null) return "vs last scan";
    if (value > 0) return `+${value}% vs last scan`;
    if (value < 0) return `${value}% vs last scan`;
    return "0% vs last scan";
  }

  function severityBadgeClass(severity) {
    return `net-sev net-sev-${severity === "none" ? "low" : severity}`;
  }

  function renderConcernPanel(model) {
    const concerns = model.concerns ?? [];
    if (!concerns.length) {
      return `
        <div class="net-concern-card">
          <div class="net-concern-h"><h4>Top concerns</h4><button type="button">View all</button></div>
          <div class="net-empty">No prioritized concerns yet.</div>
        </div>
        <div class="net-source">data_source=${esc(model.data_source)}<br>region=${esc(model.region)}</div>
      `;
    }
    const rows = concerns
      .map((c) => {
        return `
          <li class="net-concern-item">
            <div class="net-concern-text">
              <p class="net-concern-title">${esc(c.title)}</p>
              <p class="net-concern-meta">${esc(c.meta || "Needs review")}</p>
            </div>
            <span class="${severityBadgeClass(c.severity)}">${esc(c.severity.toUpperCase())}</span>
          </li>
        `;
      })
      .join("");
    return `
      <div class="net-concern-card">
        <div class="net-concern-h"><h4>Top concerns</h4><button type="button">View all</button></div>
        <ul class="net-concern-list">${rows}</ul>
      </div>
      <div class="net-source">data_source=${esc(model.data_source)}<br>region=${esc(model.region)}</div>
    `;
  }

  function renderArchitectureSvg(model) {
    const width = 1000;
    const height = 520;
    const vpcSlots = [
      { x: 150, y: 46, w: 245, h: 176 },
      { x: 423, y: 46, w: 245, h: 176 },
      { x: 696, y: 46, w: 245, h: 176 },
      { x: 278, y: 262, w: 245, h: 176 },
      { x: 551, y: 262, w: 245, h: 176 },
    ];
    const placed = model.vpcs.map((vpc, idx) => ({ ...vpc, ...(vpcSlots[idx] || vpcSlots[vpcSlots.length - 1]) }));
    const posByVpcId = new Map(placed.map((v) => [v.id, v]));

    let vpcLinks = "";
    for (const link of model.links) {
      const from = posByVpcId.get(link.from);
      const to = posByVpcId.get(link.to);
      if (!from || !to) continue;
      const x1 = from.x + from.w / 2;
      const y1 = from.y + from.h / 2;
      const x2 = to.x + to.w / 2;
      const y2 = to.y + to.h / 2;
      const c1 = x1 + (x2 - x1) * 0.2;
      const c2 = x2 - (x2 - x1) * 0.2;
      const stroke = SEVERITY_COLOR[link.severity] || "#64748b";
      vpcLinks += `<path d="M ${x1} ${y1} C ${c1} ${y1}, ${c2} ${y2}, ${x2} ${y2}" stroke="${stroke}" stroke-opacity=".28" stroke-width="${Math.min(
        1 + link.count * 0.35,
        3.2
      )}" fill="none" />`;
    }

    let exposureLinks = "";
    for (const vpc of placed) {
      if (vpc.internetExposed <= 0) continue;
      const x2 = vpc.x;
      const y2 = vpc.y + 58;
      exposureLinks += `<path d="M 108 206 C 122 206, 126 ${y2}, ${x2} ${y2}" stroke="#DC2626" stroke-opacity=".65" stroke-width="2" stroke-dasharray="5 4" fill="none" marker-end="url(#netArrowRed)"/>`;
    }

    const vpcBlocks = placed
      .map((vpc) => {
        const sevColor = SEVERITY_COLOR[vpc.severity] || "#94A3B8";
        const subnets = (vpc.subnets.length ? vpc.subnets : [{ id: "shared", label: "shared", cidr: "", entities: [] }]).slice(0, 2);
        const sw = (vpc.w - 28) / 2;
        const subnetBlocks = subnets
          .map((subnet, i) => {
            const sx = vpc.x + 10 + i * (sw + 8);
            const sy = vpc.y + 34;
            const sh = vpc.h - 46;
            const entities = (subnet.entities ?? []).slice(0, 3);
            const entityRows = entities
              .map((entity, row) => {
                const ey = sy + 40 + row * 26;
                const badge = kindTag(entity.kind);
                const eColor = SEVERITY_COLOR[entity.severity] || "#64748b";
                return `
                  <rect x="${sx + 8}" y="${ey}" rx="5" ry="5" width="${sw - 16}" height="20" fill="rgba(15,23,42,0.03)" stroke="${eColor}" stroke-opacity=".45"/>
                  <text x="${sx + 14}" y="${ey + 13}" font-size="8.5" fill="#334155" font-family="IBM Plex Mono">${esc(badge)}</text>
                  <text x="${sx + 44}" y="${ey + 13}" font-size="8.5" fill="#0f172a" font-family="IBM Plex Mono">${esc(entity.label).slice(0, 17)}</text>
                `;
              })
              .join("");
            return `
              <rect x="${sx}" y="${sy}" rx="8" ry="8" width="${sw}" height="${sh}" fill="rgba(255,255,255,0.8)" stroke="#dbe4ef"/>
              <text x="${sx + 8}" y="${sy + 16}" font-size="9" fill="#0f172a" font-weight="600" font-family="IBM Plex Mono">${esc(subnet.label).slice(0, 18)}</text>
              <text x="${sx + 8}" y="${sy + 28}" font-size="8" fill="#64748b" font-family="IBM Plex Mono">${esc(subnet.cidr || "internal subnet").slice(0, 20)}</text>
              ${entityRows}
            `;
          })
          .join("");

        return `
          <rect x="${vpc.x}" y="${vpc.y}" rx="10" ry="10" width="${vpc.w}" height="${vpc.h}" fill="rgba(255,255,255,0.96)" stroke="${sevColor}" stroke-opacity=".62" stroke-width="1.3"/>
          <text x="${vpc.x + 12}" y="${vpc.y + 16}" font-size="11" fill="#0f172a" font-weight="700" font-family="IBM Plex Mono">${esc(vpc.label).slice(0, 24)}</text>
          <text x="${vpc.x + 12}" y="${vpc.y + 29}" font-size="8.5" fill="#64748b" font-family="IBM Plex Mono">${esc(vpc.cidr || "cidr unknown").slice(0, 24)}</text>
          ${subnetBlocks}
        `;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="netArrowRed" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#DC2626" />
          </marker>
          <marker id="netArrowBlue" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#64748B" />
          </marker>
          <pattern id="netGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="#ffffff"/>
        <rect width="${width}" height="${height}" fill="url(#netGrid)" opacity=".55"/>

        <rect x="18" y="162" width="74" height="56" rx="8" ry="8" fill="#ffffff" stroke="#dc2626" stroke-opacity=".55"/>
        <text x="55" y="185" text-anchor="middle" font-size="10" fill="#b91c1c" font-family="IBM Plex Mono" font-weight="700">Internet</text>
        <circle cx="55" cy="262" r="16" fill="#ffffff" stroke="#94a3b8"/>
        <text x="55" y="266" text-anchor="middle" font-size="9" fill="#334155" font-family="IBM Plex Mono">IGW</text>

        ${exposureLinks}
        ${vpcLinks}
        ${vpcBlocks}

        <path d="M 92 262 L 150 124" stroke="#64748B" stroke-opacity=".45" stroke-width="1.4" marker-end="url(#netArrowBlue)"/>
        <path d="M 92 262 L 278 350" stroke="#64748B" stroke-opacity=".35" stroke-width="1.2" marker-end="url(#netArrowBlue)"/>
      </svg>
    `;
  }

  function renderMainPanel(model) {
    const m = model.metrics;
    return `
      <div class="net-page">
        <div class="net-head">
          <div>
            <h2 class="net-title">Network</h2>
            <p class="net-sub">Cloud network topology - VPCs, subnets, security groups, and exposure</p>
          </div>
          <div class="net-controls">
            <select id="networkRegionSelect" class="net-region">
              ${NETWORK_REGIONS.map((region) => `<option value="${region}" ${region === state.region ? "selected" : ""}>${region}</option>`).join("")}
            </select>
            <button type="button" class="net-refresh" id="networkRefreshBtn">Refresh</button>
          </div>
        </div>

        <div class="net-kpis">
          <div class="net-kpi" style="border-top-color:#0284c7">
            <p class="net-kpi-l" style="color:#0284c7">ENTITIES</p>
            <p class="net-kpi-v" style="color:#0284c7">${esc(m.entities)}</p>
            <p class="net-kpi-s">${esc(fmtDelta(m.entities_delta))}</p>
          </div>
          <div class="net-kpi" style="border-top-color:#dc2626">
            <p class="net-kpi-l" style="color:#dc2626">INTERNET EXPOSED</p>
            <p class="net-kpi-v" style="color:${m.internet_exposed > 0 ? "#dc2626" : "#94a3b8"}">${esc(m.internet_exposed)}</p>
            <p class="net-kpi-s">${esc(fmtDelta(m.internet_exposed_delta))}</p>
          </div>
          <div class="net-kpi" style="border-top-color:#0d9488">
            <p class="net-kpi-l" style="color:#0d9488">VPCs</p>
            <p class="net-kpi-v" style="color:#0d9488">${esc(m.vpcs)}</p>
            <p class="net-kpi-s">${esc(fmtDelta(m.vpcs_delta))}</p>
          </div>
          <div class="net-kpi" style="border-top-color:#f97316">
            <p class="net-kpi-l" style="color:#ea580c">ATTACK PATHS IN NETWORK</p>
            <p class="net-kpi-v" style="color:${m.internet_exposed_paths > 0 ? "#ea580c" : "#94a3b8"}">${esc(m.internet_exposed_paths)}</p>
            <p class="net-kpi-s">${esc(fmtDelta(m.internet_exposed_paths_delta))}</p>
          </div>
        </div>

        <div class="net-topology-card">
          <div class="net-topology-h">
            <h3 class="net-topology-title">Network topology</h3>
            <div class="net-legend">
              <span class="net-leg"><span class="dot" style="background:#dc2626"></span>internet-facing</span>
              <span class="net-leg"><span class="dot" style="background:#64748b"></span>inter-vpc</span>
              <span class="net-leg"><span class="dot" style="background:#0ea5e9"></span>subnet</span>
            </div>
          </div>
          <div class="net-topology-viz">${renderArchitectureSvg(model)}</div>
          <div class="net-topology-footer">
            <button type="button" class="net-topology-cta" id="networkAttackPathsBtn">View attack paths in this VPC -></button>
          </div>
        </div>
      </div>
    `;
  }

  async function fetchJson(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
        signal: controller.signal,
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || !contentType.includes("application/json")) return null;
      return await res.json();
    } catch (_err) {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  async function resolvePayload(region) {
    const params = new URLSearchParams(window.location.search || "");
    const dataUrl = params.get("network_data_url");
    if (dataUrl) {
      const inlinePayload = await fetchJson(dataUrl);
      const normalizedInline = inlinePayload ? normalizeNetworkPayload(inlinePayload) : null;
      if (normalizedInline) return normalizedInline;
    }

    const scanId = params.get("scan_id");
    if (scanId) {
      const scanPayload = await fetchJson(`/api/free-scan/status/${encodeURIComponent(scanId)}`);
      const normalizedScan = scanPayload ? normalizeNetworkPayload(scanPayload) : null;
      if (normalizedScan) return normalizedScan;
    }

    const macroPayload = await fetchJson(`/v1/network/macro-graph?region=${encodeURIComponent(region)}`);
    const normalizedMacro = macroPayload ? normalizeNetworkPayload(macroPayload) : null;
    if (normalizedMacro) return normalizedMacro;

    return normalizeNetworkPayload(NETWORK_FALLBACK_PAYLOAD) || NETWORK_FALLBACK_PAYLOAD;
  }

  function setMode(refs, isNetwork) {
    const { wrapEl, rightEl, defaultSideEl, networkSideEl, canvasEl } = refs;
    if (wrapEl) wrapEl.classList.toggle("network-mode", isNetwork);
    if (rightEl) rightEl.classList.toggle("network-mode", isNetwork);
    if (canvasEl) canvasEl.classList.toggle("network-mode", isNetwork);
    if (defaultSideEl) defaultSideEl.style.display = isNetwork ? "none" : "";
    if (networkSideEl) networkSideEl.style.display = isNetwork ? "flex" : "none";
  }

  function bindInteractions(refs) {
    const select = document.getElementById("networkRegionSelect");
    if (select) {
      select.onchange = async (event) => {
        state.region = event.target.value || "us-east-1";
        state.loaded = false;
        await render(refs, { force: true });
      };
    }

    const refresh = document.getElementById("networkRefreshBtn");
    if (refresh) {
      refresh.onclick = async () => {
        await render(refs, { force: true });
      };
    }

    const viewPaths = document.getElementById("networkAttackPathsBtn");
    if (viewPaths) {
      viewPaths.onclick = () => {
        if (typeof window.goTo === "function") {
          window.goTo(1);
        }
      };
    }
  }

  async function render(refs, options = {}) {
    installStyles();
    setMode(refs, true);
    const { canvasEl, networkSideEl } = refs;
    if (!canvasEl || !networkSideEl) return;

    const force = Boolean(options.force);
    if (state.loading) {
      canvasEl.innerHTML = `<div class="net-loading">Loading network topology...</div>`;
      networkSideEl.innerHTML = `<div class="net-loading">Loading concerns...</div>`;
      return;
    }

    if (!state.loaded || force) {
      state.loading = true;
      const nonce = ++state.requestNonce;
      canvasEl.innerHTML = `<div class="net-loading">Loading network topology...</div>`;
      networkSideEl.innerHTML = `<div class="net-loading">Loading concerns...</div>`;
      const nextPayload = await resolvePayload(state.region);
      if (nonce !== state.requestNonce) return;
      state.payload = nextPayload;
      state.region = nextPayload.region || state.region;
      state.loaded = true;
      state.loading = false;
    }

    const normalized = normalizeNetworkPayload(state.payload) || normalizeNetworkPayload(NETWORK_FALLBACK_PAYLOAD);
    if (!normalized) {
      canvasEl.innerHTML = `<div class="net-empty">Could not load network graph data.</div>`;
      networkSideEl.innerHTML = `<div class="net-empty">No concerns available.</div>`;
      if (typeof window.showToast === "function") {
        window.showToast("Could not load network data. Showing fallback.", "red", 2800);
      }
      return;
    }

    state.region = normalized.region || state.region;
    const model = buildArchitectureModel(normalized);
    canvasEl.innerHTML = renderMainPanel(model);
    networkSideEl.innerHTML = renderConcernPanel(model);
    bindInteractions(refs);
  }

  function deactivate(refs) {
    setMode(refs, false);
  }

  window.XSEENetworkDemo = {
    render,
    deactivate,
  };
})();
