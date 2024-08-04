export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (isOwner) return false;
  if (m.isGroup) return false;
  if (!m.isGroup) {
    await m.reply(
      *[❗] مرحبًا @${m.sender.split('@')[0]}، يُمنع التحدث في الخاص مع البوت لهذا السبب سيتم حظرك.*\n\n*اذا كنت تريد تجربه البوت ادخل جروب البوت『 https://chat.whatsapp.com/KCr93o7UJW92fOyIQTlqkm 』*\n\n*اذا كنت تريد ان تكلم مطور البوت هذا رقمي 『‏‪+967730068059』*,
      false,
      { mentions: [m.sender] }
    );
    await conn.updateBlockStatus(m.chat, 'block');
    return true;
  }
}
