

let handler = async (m, { command, text }) => m.reply(`

املئ الاستمـ📜ـارة :

◉━━━─ •༺ 🔴 ༻• ─━━━◉
⸙ المنشن 【】
⸙ لقبك 【 】
⸙ من اي انمي لقبك 【】
⸙ من طرف مين 【】
⸙ صوره لشخصيت لقبك【】
⸙ ولد ولا بنت【】
⸙ الرتبه【】
●━━━ • ━❪🔴❫━ • ━━━●


عبي الاستماره و منشن احد المشرفين┋

ارفق مع لقبك صور ل الشخصيه┋⚜️

ممنوع ولد يختار لقب بنت و العكس┋🔰

*◉━━━─ •༺ 🔴 ༻• ─━━━◉
『Anime⊰🔴⊱Gang』
*◉━━━── •༺ 👑 ༻• ──━
`.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

handler.help = ['استماره <teks>?']
handler.tags = ['استماره', 'fun']
handler.command = /^(استماره)$/i

export default handler
