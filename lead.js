// Recebe os contatos do site e envia por e-mail (Resend). Sem dependências.
const clean = (s, n = 400) => String(s == null ? "" : s).replace(/[<>]/g, "").trim().slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let d = req.body;
  if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = {}; } }
  d = d || {};

  const nome = clean(d.nome, 80);
  const zap = clean(d.whatsapp, 30).replace(/\D/g, "");
  if (nome.length < 2 || zap.length < 10 || zap.length > 13) {
    return res.status(400).json({ ok: false, error: "dados inválidos" });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || "agenciaproluze@gmail.com";
  const from = process.env.LEAD_FROM_EMAIL || "PROLUZE Site <onboarding@resend.dev>";
  const wa = "https://wa.me/" + (zap.length <= 11 ? "55" + zap : zap);

  const campos = [
    ["Origem", d.origem], ["Nome", nome], ["WhatsApp", zap], ["Abrir conversa", wa],
    ["Perfil", d.perfil], ["Compatibilidade", d.score ? d.score + "%" : ""],
    ["Negócio", d.negocio], ["Faturamento", d.faturamento], ["Investimento em marketing", d.investimento],
    ["Maior problema", d.problema], ["Urgência", d.urgencia],
  ].filter((c) => c[1] !== undefined && c[1] !== "");
  const text = campos.map((c) => c[0] + ": " + clean(c[1])).join("\n");

  console.log("LEAD", JSON.stringify({ origem: d.origem, nome, zap, score: d.score })); // fica nos logs da Vercel

  if (!key) return res.status(500).json({ ok: false, error: "RESEND_API_KEY ausente" });
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: "Novo lead PROLUZE: " + clean(d.origem, 40) + " | " + nome, text }),
    });
    if (!r.ok) { console.error("RESEND", r.status, await r.text()); return res.status(502).json({ ok: false }); }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("RESEND", e);
    return res.status(502).json({ ok: false });
  }
};
