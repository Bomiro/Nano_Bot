import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "بحث",
        "تحميل",
        "القائمه"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("هذا الامر خاص بتحميل مشاريع جاهزة لتطبيق بيكسلاب وهو تطبيق للتعديل على الصور \nهذه المشاريع سوف تسهل عليك التعديل على الصور + تختصر الوقت اذا اردت ان تحمل هذه المشاريع او تبحث عنها نكتب ويفضل كتابت ما تبحث عنه بالانجليزيه\n\n*.plp بحث|cover*\n\nاذا اردت التحميل تقوم بنسخ رابط مشروع قمت بالبحث عنه قبل قليل ونكتب\n\n*.plp تحميل|(رابط المشروع)*\n\nيمكنك ايضا كتابة\n*.plp القائمه*\nلتنبتق لك المشاريع الجديدة ويمكنك تحميلها♥\n\n*options*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "بحث") {
            if (!inputs) return m.reply("مثال\n\n*.plp بحث|cover*")
            await m.reply(wait)
            try {
                let res = await searchPLP(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ نتيجة ${index + 1} ]*\n\n` +
                        `📢 *الاسم:* ${item.name || 'غير متاح'}\n` +
                        `🌐 *الرابط:* ${item.link || 'غير متاح'}\n`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('مشكله')
            }
        }

        if (feature == "تحميل") {
            if (!inputs) return m.reply("مثال:\n\n.plp تحميل|https://www.freeplp.com/2023/09/viral-facebook-profile-photo-editing.html")
            await m.reply(wait)
            try {
                let res = await downPLP(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ نتيجه ${index + 1} ]*\n\n` +
                        `📢 *الاسم:* ${item.name || 'غير متاح'}\n` +
                        `🌐 *الرابط:* ${item.link || 'غير متاح'}\n`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('مشكله')
            }
        }

        if (feature == "القائمه") {
            await m.reply(wait)
            try {
                let res = await latestPLP(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ نتيجه ${index + 1} ]*\n\n` +
                        `📢 *الاسم:* ${item.name || 'غير متاح'}\n` +
                        `🌐 *الرابط:* ${item.link || 'غير متاح'}\n`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('مشكله')
            }
        }

    }
}
handler.help = ["pixellab"]
handler.tags = ["downloader"]
handler.command = /^(plp|pixellab)$/i
export default handler

/* New Line */
async function latestPLP() {
  try {
    const response = await fetch('https://www.freeplp.com/'); // Replace with the URL of the website containing the HTML data
    const html = await response.text();
    const $ = cheerio.load(html);

    const data = [];

    $('.pTtl a').each((index, element) => {
      const link = $(element).attr('href') || '';
      const name = $(element).text().trim() || '';
      data.push({ link, name });
    });

    return data;
  } catch (error) {
    console.error('حدث خطأ أثناء جلب البيانات أو تحليلها:', error);
    return [];
  }
}

async function downPLP(url) {
  try {
    const response = await fetch(url); // Replace with the URL of the website containing the HTML data
    const html = await response.text();
    const $ = cheerio.load(html);

    const data = [];

    $('.manualDownload-text a').each((index, element) => {
      const link = $(element).attr('href');
      const name = $(element).text().trim();
      data.push({ link, name });
    });
    return data;
  } catch (error) {
    console.error('حدث خطأ أثناء جلب البيانات أو تحليلها:', error);
    return [];
  }
}


async function searchPLP(q) {
  try {
  const result = [];
  const response = await fetch('https://www.freeplp.com/search?q=' + q);
    const html = await response.text();
  const $ = cheerio.load(html);
  const articles = $('article.ntry');

  articles.each((index, element) => {
    const name = $(element).find('h2.pTtl a').text().trim();
    const link = $(element).find('h2.pTtl a').attr('href');

    result.push({ name, link });
  });

  return result;
  } catch (error) {
    console.error('حدث خطأ أثناء جلب البيانات أو تحليلها:', error);
    return [];
  }
}