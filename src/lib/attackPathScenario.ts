export type NodeKind = "internet" | "alb" | "foothold" | "ecs" | "role" | "secret" | "bucket";

export type ScenarioNode = {
  id: string;
  kind: NodeKind;
  name: string;
  resource: string;
  typeLabel: string;
  tag?: string;
  summary: string;
};

export type BaseEdgeStatus = "assumed" | "observed" | "simulated" | "untested";

export type ScenarioEdge = {
  id: string;
  from: string;
  to: string;
  label: string;
  base: BaseEdgeStatus;
  evidence: string;
  method: string;
  result: string;
  limitations: string;
};


export const SCENARIO = {
  name: "Northwind Retail (fictional)",
  account: "111122223333 · prod · us-east-1",
  pathId: "AP-12",
  pathTitle: "Assumed web foothold → production database secret",
  remediatedEdge: "e-assume",
} as const;

export const NODES: ScenarioNode[] = [
  {
    id: "internet",
    kind: "internet",
    name: "Internet",
    resource: "0.0.0.0/0",
    typeLabel: "External network",
    tag: "Exposure",
    summary: "Any public client. Reachability alone does not imply compromise.",
  },
  {
    id: "alb",
    kind: "alb",
    name: "alb-web-public",
    resource: "Application Load Balancer",
    typeLabel: "Elastic Load Balancing",
    summary: "Internet-facing load balancer that forwards HTTPS traffic to the web service.",
  },
  {
    id: "web",
    kind: "ecs",
    name: "web-frontend",
    resource: "ECS service · Fargate",
    typeLabel: "Amazon ECS",
    summary: "Customer-facing web service. The path analysis begins from an assumed foothold here.",
  },
  {
    id: "foothold",
    kind: "foothold",
    name: "Assumed foothold",
    resource: "Code execution in task",
    typeLabel: "Analysis assumption",
    tag: "Assumption",
    summary:
      "A hypothetical starting point: an attacker can run code inside a web-frontend task. XSEE does not test or demonstrate this; it is the condition the path is evaluated under.",
  },
  {
    id: "role-web",
    kind: "role",
    name: "role-web-task",
    resource: "IAM role · task role",
    typeLabel: "AWS IAM",
    summary: "Task role whose temporary credentials are available to code running in web-frontend.",
  },
  {
    id: "role-batch",
    kind: "role",
    name: "role-batch-ops",
    resource: "IAM role · batch jobs",
    typeLabel: "AWS IAM",
    summary: "Operations role used by scheduled batch jobs. Its trust policy controls who may assume it.",
  },
  {
    id: "bucket",
    kind: "bucket",
    name: "nw-exports",
    resource: "S3 bucket",
    typeLabel: "Amazon S3",
    summary: "Bucket containing report exports. Its relationship to role-web-task has not been tested.",
  },
  {
    id: "secret",
    kind: "secret",
    name: "prod/orders-db",
    resource: "Secrets Manager secret",
    typeLabel: "AWS Secrets Manager",
    tag: "Sensitive target",
    summary: "Production database credentials. The target of path AP-12.",
  },
];

export const EDGES: ScenarioEdge[] = [
  {
    id: "e-ingress",
    from: "internet",
    to: "alb",
    label: "HTTPS :443 open",
    base: "observed",
    evidence: "Listener on :443 with security group sg-alb allowing 0.0.0.0/0.",
    method: "Read-only configuration collection (ELB and EC2 describe calls).",
    result: "Public exposure observed. This is context, not evidence of compromise.",
    limitations: "Does not assess application vulnerabilities behind the listener.",
  },
  {
    id: "e-forward",
    from: "alb",
    to: "web",
    label: "Forwards to target group",
    base: "observed",
    evidence: "Listener rule forwards to target group tg-web, registered to web-frontend tasks.",
    method: "Read-only configuration collection.",
    result: "Traffic route observed.",
    limitations: "Configuration only. No traffic was sent.",
  },
  {
    id: "e-foothold",
    from: "foothold",
    to: "web",
    label: "Assumed code execution",
    base: "assumed",
    evidence: "None. This relationship is an analysis assumption, not a finding.",
    method: "Stated as a precondition for evaluating AP-12.",
    result: "Assumed, not validated.",
    limitations: "If no code-execution weakness exists, this path has no realistic entry point.",
  },
  {
    id: "e-web-role",
    from: "web",
    to: "role-web",
    label: "Task role credentials",
    base: "observed",
    evidence: "Task definition web-frontend:42 sets taskRoleArn to role-web-task.",
    method: "Read-only configuration collection (ECS describe calls).",
    result: "Code in the task can obtain role-web-task credentials.",
    limitations: "Assumes the foothold above. No credentials were retrieved.",
  },
  {
    id: "e-assume",
    from: "role-web",
    to: "role-batch",
    label: "sts:AssumeRole",
    base: "simulated",
    evidence:
      "role-web-task allows sts:AssumeRole on *. The role-batch-ops trust policy trusts the account root principal.",
    method: "IAM policy simulation across identity policy, trust policy, SCPs, and permission boundary.",
    result: "Simulated: allowed.",
    limitations: "Simulation only. No role was assumed.",
  },
  {
    id: "e-secret",
    from: "role-batch",
    to: "secret",
    label: "GetSecretValue",
    base: "simulated",
    evidence: "role-batch-ops policy grants secretsmanager:GetSecretValue on prod/*. No resource policy denies it.",
    method: "IAM policy simulation including the secret's resource policy and KMS key policy.",
    result: "Simulated: allowed.",
    limitations: "Simulation only. The secret was not read.",
  },
  {
    id: "e-exports",
    from: "role-web",
    to: "bucket",
    label: "s3:GetObject",
    base: "untested",
    evidence: "A policy statement references nw-exports. It has not been evaluated yet.",
    method: "Not yet run.",
    result: "Untested. No result is implied.",
    limitations: "Outside the scope of AP-12 in this illustration.",
  },
];

export const PATH_EDGES = ["e-foothold", "e-web-role", "e-assume", "e-secret"] as const;
export const INSPECT_ORDER = ["e-foothold", "e-web-role", "e-assume", "e-secret", "e-exports"] as const;
export const TRAVERSE_ORDER = ["e-foothold", "e-web-role", "e-assume"] as const;

export const STEPS = [
  { key: "discover", title: "Discover", detail: "Map resources" },
  { key: "inspect", title: "Inspect", detail: "Review evidence" },
  { key: "review", title: "Review fix", detail: "Predicted effect" },
  { key: "approve", title: "Approve", detail: "Human decision" },
  { key: "verify", title: "Verify", detail: "Replay the path" },
  { key: "drift", title: "Drift", detail: "Reassess" },
] as const;

/** Durations (ms) of each beat inside a step. After the last beat the step is settled. */
export const STEP_BEATS: number[][] = [
  [450, 900, 3600],
  [2800, 2800, 3200, 2800, 2800],
  [2600, 4200],
  [],
  [800, 1100, 1300, 1400, 4200],
  [],
];

export const POLICY = {
  before: [
    { text: '"Effect": "Allow",' },
    { text: '"Principal": {' },
    { text: '  "AWS": "arn:aws:iam::111122223333:root"', mark: "remove" },
    { text: "}," },
    { text: '"Action": "sts:AssumeRole"' },
  ],
  after: [
    { text: '"Effect": "Allow",' },
    { text: '"Principal": {' },
    { text: '  "AWS": "arn:aws:iam::111122223333:role/batch-scheduler"', mark: "add" },
    { text: "}," },
    { text: '"Action": "sts:AssumeRole"' },
  ],
  drifted: [
    { text: '"Effect": "Allow",' },
    { text: '"Principal": {' },
    { text: '  "AWS": [' },
    { text: '    "arn:aws:iam::111122223333:role/batch-scheduler",' },
    { text: '    "arn:aws:iam::111122223333:role/role-web-*"', mark: "drift" },
    { text: "  ]" },
    { text: "}," },
    { text: '"Action": "sts:AssumeRole"' },
  ],
} as const;

export const TIMESTAMPS = {
  discovered: "Mar 02 · 09:14 UTC",
  approved: "Mar 03 · 16:40 UTC",
  applied: "Mar 03 · 17:05 UTC",
  verified: "Mar 03 · 17:22 UTC",
  drift: "Mar 12 · 11:08 UTC",
  recheck: "Mar 12 · 11:31 UTC",
} as const;
