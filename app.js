const clients = [
  { name: "Bloom Wellness Center", type: "Wellness Center", location: "Austin, TX", clients: 342, revenue: 48200, status: "Active" },
  { name: "Glow Skin Studio", type: "Esthetician", location: "Portland, OR", clients: 128, revenue: 21500, status: "Active" },
  { name: "Still Waters Massage", type: "Massage Studio", location: "Denver, CO", clients: 210, revenue: 29800, status: "Active" },
  { name: "Radiance Med Spa", type: "Med Spa", location: "Miami, FL", clients: 415, revenue: 86400, status: "Active" },
  { name: "Lotus Holistic Health", type: "Wellness Center", location: "Asheville, NC", clients: 96, revenue: 15300, status: "Pending" },
  { name: "Velvet Lash & Brow", type: "Esthetician", location: "Nashville, TN", clients: 174, revenue: 18900, status: "Active" },
  { name: "Harmony Day Spa", type: "Massage Studio", location: "Scottsdale, AZ", clients: 88, revenue: 12100, status: "Inactive" },
  { name: "Pure Aesthetics Clinic", type: "Med Spa", location: "Seattle, WA", clients: 260, revenue: 61700, status: "Pending" },
];

const money = n => "$" + n.toLocaleString();

function renderStats(list) {
  const active = list.filter(c => c.status === "Active").length;
  const totalClients = list.reduce((sum, c) => sum + c.clients, 0);
  const revenue = list.reduce((sum, c) => sum + c.revenue, 0);
  const stats = [
    { label: "Total Practices", value: list.length },
    { label: "Active Practices", value: active },
    { label: "Total End Clients", value: totalClients.toLocaleString() },
    { label: "Monthly Revenue", value: money(revenue) },
  ];
  document.getElementById("stats").innerHTML = stats
    .map(s => `<div class="stat"><div class="label">${s.label}</div><div class="value">${s.value}</div></div>`)
    .join("");
}

function renderTable() {
  const q = document.getElementById("search").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;
  const filtered = clients.filter(c =>
    (type === "all" || c.type === type) &&
    (c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
  );

  document.getElementById("clientRows").innerHTML = filtered.map(c => `
    <tr>
      <td class="practice-name">${c.name}</td>
      <td>${c.type}</td>
      <td>${c.location}</td>
      <td>${c.clients}</td>
      <td>${money(c.revenue)}</td>
      <td><span class="badge ${c.status.toLowerCase()}">${c.status}</span></td>
    </tr>`).join("");

  document.getElementById("empty").hidden = filtered.length > 0;
}

document.getElementById("search").addEventListener("input", renderTable);
document.getElementById("typeFilter").addEventListener("change", renderTable);
document.getElementById("addBtn").addEventListener("click", () => {
  alert("Add Client form coming soon — a great feature to build on a branch!");
});

renderStats(clients);
renderTable();
