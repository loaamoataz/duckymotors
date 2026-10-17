        let selectedDonation = 10;
        let customerName = '';
        let charityTotal = 14250;

        function toggleNav(force) {
    const nav = document.getElementById('main-nav');
    const btn = document.getElementById('nav-toggle');
    const open = typeof force === 'boolean' ? force : !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? '✕ إغلاق القائمة' : '☰ القائمة';
}

function switchSectionAndBubble(sectionId, popoverId) {
    toggleNav(false);
            const sections = document.querySelectorAll('.page-section');
            sections.forEach(sec => sec.classList.remove('active'));

            const buttons = document.querySelectorAll('nav button');
            buttons.forEach(btn => btn.classList.remove('active'));

            const brandHeader = document.querySelector('.brand-container');
            if (brandHeader) brandHeader.style.display = (sectionId === 'home') ? '' : 'none';

            const targetSection = document.getElementById('section-' + sectionId);
            const targetButton = document.getElementById('nav-' + sectionId);

            if (targetSection) targetSection.classList.add('active');
            if (targetButton) targetButton.classList.add('active');

            document.querySelectorAll('.duck-bubble-popover').forEach(pop => {
                pop.classList.remove('show');
            });

            const activePopover = document.getElementById('popover-' + popoverId);
            if (activePopover) {
                activePopover.classList.add('show');
            }

            if (sectionId !== 'charity') {
                const toast = document.getElementById('toast-notif');
                if (toast) toast.classList.remove('show');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.addEventListener("DOMContentLoaded", function() {
            switchSectionAndBubble('home', 'nest');
            renderWorkshop();
            initLoungeDropdowns();
            initOpenPairs();
            calculatePrice();
            startLiveToasts();
            renderOrderHistory();
        });

        function playDuckySound() {
            var audio = document.getElementById("duckAudio");
            if(audio) audio.play();
        }

        /* CALCULATOR LOGIC */

        /* BOOKING FORM LOGIC */

        /* CAR SELL FORM LOGIC */
        function handleCarSellSubmit(e) {
            e.preventDefault();
            alert("تم تسجيل بيانات سيارتك بـ نجاح على منصة وساطة DUCKY MOTORS! سيتم مراجعتها وإدراجها بتقرير الكشف الشفاف فوراً. 🚗✨");
        }

        /* INSPECTION FORM LOGIC */
        function handleInspectionSubmit(e) {
            e.preventDefault();
            alert("تم حجز موعد الكشف الشامل لـ منع النصب بنجاح! يسعدنا استلام السيارة بالمركز لتطبيق فحص الـ 280 نقطة وإصدار التقرير الموثق. 🎯🛑");
        }

        /* LIVE TRACKER LOGIC */
        function checkDuckTracker() {
            const val = document.getElementById('tracker-input').value.trim();
            if(!val) return;
            alert(`تم جلب حالة السيارة لـ العضوية (${val}): عربيتك حالياً في مرحلة "الفحص والصيانة 🔧" والمتوقع تسليمها خلال ساعة!`);
        }

        /* LIVE TOAST NOTIFICATIONS */
        function startLiveToasts() {
            const amounts = [5, 10, 20, 25, 50, 75, 100, 150, 200];

            setInterval(() => {
                const charity = document.getElementById('section-charity');
                if (!charity || !charity.classList.contains('active')) return;

                const amount = amounts[Math.floor(Math.random() * amounts.length)];
                const donor = '#DUCK-' + (1000 + Math.floor(Math.random() * 9000));

                charityTotal += amount;
                updateCharityTotal();

                const toast = document.getElementById('toast-notif');
                document.getElementById('toast-msg').textContent =
                    `العميل ${donor} تبرع بـ ${amount} جنيه لـ سهم الخير 🌾`;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 5000);
            }, 60000);
        }

        function updateCharityTotal() {
            const el = document.getElementById('total-charity-shares');
            if (el) el.textContent = charityTotal.toLocaleString('en-US') + ' جنيه';
        }

        function submitDuckPuzzle(e) {
            e.preventDefault();
            
            const q1 = document.getElementById('puzzle-q1').value.trim();
            const q2 = document.getElementById('puzzle-q2').value.trim();
            const q3 = document.getElementById('puzzle-q3').value.trim().toLowerCase();
            const userId = document.getElementById('puzzle-user-id').value.trim();
            const resultBox = document.getElementById('puzzle-result');

            const isQ1Correct = (q1 === "بطة" || q1 === "بطة");
            const isQ2Correct = (q2 === "100");
            const isQ3Correct = (q3.includes("فلتر") || q3.includes("الفلتر"));

            if (isQ1Correct && isQ2Correct && isQ3Correct) {
                const currentTime = new Date().toLocaleTimeString('ar-EG');
                resultBox.style.display = 'block';
                resultBox.style.backgroundColor = '#1e4620';
                resultBox.style.color = '#25D366';
                resultBox.style.border = '2px solid #25D366';
                resultBox.innerHTML = `🎉 مبروك يا بطبوط! إجاباتك كلها صحيحة 🦆💥<br> تم تسجيل حل العضوية (<b>${userId}</b>) بتاريخ ووقت: <b>${currentTime}</b> بنجاح! سيتم إعلان الفائزين قريباً.`;
            } else {
                resultBox.style.display = 'block';
                resultBox.style.backgroundColor = '#4a1212';
                resultBox.style.color = '#ff6b6b';
                resultBox.style.border = '2px solid #ff6b6b';
                resultBox.innerHTML = `❌ لـ الأسف يا فنان! فيه إجابة مش مظبوطة.. فكر تانى وركز عشان متضيعش فرصة الاشتراك المدى الحياة! 🦆`;
            }
        }

        /* DUAL EMERGENCY SOS ACTION DISPATCHER */
        function triggerSosEmergency(type) {
            const modal = document.getElementById('sos-modal');
            const msgBox = document.getElementById('sos-modal-message');
            const titleBox = document.getElementById('sos-modal-title');

            let message = "";
            let title = "🚨 نداء إغاثة من البطة السفّاحة!";

            switch(type) {
                case 1:
                    message = "📍 تم تحديد موقعك الجغرافى بنجاح! فرقة الإنقاذ السريع من مركز البطة فى طريقها إليك الآن على الطريق، خليك مكانك ومتخافش! 🦆💨";
                    break;
                case 2:
                    const fuel = document.getElementById('sos-fuel-type').value;
                    message = `⛽ تم استلام طلب طوارئ الوقود! تم توجيه سيارة الإغاثة بـ حمولة [بنزين ${fuel}] كافية لـ توصيلك لأقرب محطة بنزين!`;
                    break;
                case 3:
                    const evType = document.getElementById('sos-ev-type').value;
                    message = `⚡ تم إرسال وحدة الشحن المتنقلة الفورية لـ لسيارات الكهربائية بـ مدخل [${evType}] لـ شحن بطاريتك طوارئ فوراً!`;
                    break;
                case 4:
                    const tyreSize = document.getElementById('sos-tyre-size').value || "المقاس القياسى";
                    message = `🛞 تم توجيه سيارة الصيانة السريعة مع كمبروسر هواء وطقم إطارات بأ مقاس [${tyreSize}] لـ تغيير الكاوتش فى موقعك!`;
                    break;
                case 5:
                    message = "🛢️ فريق الصيانة الدباحة فى الطريق إليك مع جركن زيت أصلية ومياه تبريد معتمدة! بلاش تدور المحرك دلوقتى نهائياً!";
                    break;
                case 6:
                    message = "🔋 فنى الكهرباء اتحرك فوراً بـ جهاز كابلات وصلة البطارية وجهاز الفحص السريع لـ موقعك! دقائق وهتكون على الطريق!";
                    break;
                case 7:
                    title = "🚜 استدعاء ونش إنقاذ عاجل!";
                    message = "تم إرسال أقرب ونش إنقاذ خاص بـ DUCKY MOTORSإليك فوراً لـ سحب العربية وإيصالها بسلام لـ فرعنا الرئيسى !";
                    break;
                case 8:
                    message = "🔑 فنى فتح السيارات بدون تجريح وضبط الشفرات اتحرك فوراً لـ موقعك، عربيتك هتتفتح فى دقائق بدون أى أضرار!";
                    break;
                case 9:
                    message = "🌾 سيارة الدفع الرباعى والمعدات الخاصة بـ السحب والانتشال فى طريقها إليك فوراً لـ فك الغرزة وإعادتك لـ الأسفلت!";
                    break;
                case 10:
                    message = "🛑 تحذير مهم: اربط فرامل اليد بـ التدريج واهدأ تماماً! فريق الصيانة السريعة ومعدات الهيدروليك اتحركوا لإغاثتك!";
                    break;
                case 11:
                    message = "🌧️ فريق الطوارئ الكهربائية طالع لك بـ لمبات إضاءة وشفرات مساحات بديلة عشان توصل بـ أمان وسعادة!";
                    break;
                case 12:
                    title = "🚑 نداء إغاثة طبية عاجل!";
                    message = "ألف سلامة عليك يا بطل! تم ربط إحداثياتك الفورية وإبلاغ هيئة الإسعاف وتوجيه أقرب فريق صيانة لـ دعمك فوراً!";
                    break;
            }

            titleBox.textContent = title;
            msgBox.textContent = message;
            modal.style.display = 'flex';
        }

        function closeSosModal() {
            document.getElementById('sos-modal').style.display = 'none';
        }

        /* DONATION FUNCTIONS */
        function selectDonationAmount(amount, btn) {
            selectedDonation = amount;
            document.querySelectorAll('.donation-btn').forEach(btn => btn.classList.remove('selected'));
            if (btn) btn.classList.add('selected');
            document.getElementById('custom-donation-input').value = '';
        }


        /* LOUNGE DROPDOWNS: always expand downward */
        function initLoungeDropdowns() {
            document.querySelectorAll('#section-snack select').forEach(sel => {
                const collapse = () => { sel.size = 1; };
                sel.addEventListener('mousedown', e => {
                    if (sel.size <= 1) {
                        e.preventDefault();
                        sel._openedAt = Date.now();
                        sel.size = Math.min(sel.options.length, 7);
                        sel.focus();
                    }
                });
                sel.addEventListener('click', e => {
                    if (sel.size > 1 && e.target.tagName === 'OPTION' && Date.now() - (sel._openedAt || 0) > 300) {
                        collapse();
                        sel.blur();
                    }
                });
                sel.addEventListener('change', () => { collapse(); sel.blur(); });
                sel.addEventListener('blur', collapse);
                sel.addEventListener('keydown', e => { if (e.key === 'Escape' || e.key === 'Enter') collapse(); });
            });
        }

        /* لما سكشن وقدامه سكشن بنفس الرقم يتفتحوا مع بعض، يبقوا بنفس الحجم */
        function syncOpenPairs() {
            const boxes = document.querySelectorAll('#section-services .menu-box');
            if (boxes.length < 2) return;
            const a = boxes[0].querySelectorAll(':scope > details');
            const b = boxes[1].querySelectorAll(':scope > details');
            a.forEach((d, i) => { d.style.minHeight = ''; if (b[i]) b[i].style.minHeight = ''; });
            a.forEach((d, i) => {
                const o = b[i];
                if (o && d.open && o.open) {
                    const h = Math.max(d.offsetHeight, o.offsetHeight);
                    d.style.minHeight = h + 'px';
                    o.style.minHeight = h + 'px';
                }
            });
        }

        function initOpenPairs() {
            const sec = document.getElementById('section-services');
            if (!sec) return;
            sec.querySelectorAll('details').forEach(d => d.addEventListener('toggle', () => {
                syncOpenPairs();
                setTimeout(syncOpenPairs, 400);
            }));
            sec.querySelectorAll('img').forEach(i => i.addEventListener('load', syncOpenPairs));
            sec.querySelectorAll('video').forEach(v => v.addEventListener('loadedmetadata', syncOpenPairs));
            window.addEventListener('resize', syncOpenPairs);
        }

        /* WORKSHOP DATA: [الاسم, السعر (رقم أو نص), النوع] */
        const MOD_DATA = [
            { title: '💰 Stage 0.5 - باكيدج الميزانية', note: 'تحسين بسيط وسريع بسعر رمزى', p: 1, items: [
                ['تنظيف بوابة الهواء + فلتر رياضى + ظبط ضغط الإطارات', 1800, 'ok']] },
            { title: '⚡ Stage 1 - أداء خفيف', note: 'زيادة بسيطة فى القوة من غير تغيير كبير', p: 1, items: [
                ['ريماب ECU Stage 1', 4500, 'ok'],
                ['فلتر هواء عالى التدفق', 1200, 'ok'],
                ['تنظيف دورة الهواء والـ بخاخات', 900, 'ok']] },
            { title: '🔥 Stage 2 - أداء متوسط', note: 'لو  عايز بطتك  تطير على الطريق السريع', p: 2, items: [
                ['ريماب ECU Stage 2', 9000, 'lic'],
                ['عادم رياضى (Sport Exhaust)', 6500, 'lic'],
                ['إنتركولر محسّن', 8000, 'lic'],
                ['مبرد زيت إضافى + رادياتير ألومنيوم', 7500, 'ok']] },
            { title: '🚀 Stage 3 - أداء عالى', note: 'لـ المجانين بس.. قوة حقيقية وتجهيز كامل', p: 4, items: [
                ['ريماب ECU مخصص (Custom Tune)', 18000, 'lic'],
                ['تيربو أكبر (Big Turbo)', 25000, 'lic'],
                ['نظام وقود محسّن (طلمبة + بخاخات)', 8500, 'lic'],
                ['دبرياج مقوّى (Performance Clutch)', 9000, 'ok'],
                ['بساتم وبيل مطروقة (Forged)', 40000, 'lic'],
                ['حقن ميثانول + ماء (Water-Methanol)', 12000, 'lic'],
                ['كيت وقود كحولى (Flex Fuel E85)', 15000, 'lic'],
                ['أنبوب تفريغ التيربو (Screamer Pipe) - للمضمار بس', 6000, 'lic']] },
            { title: '🏁 العفشة والفرامل والثبات', note: 'ثبات أكتر وفرامل أقوى', p: 2, items: [
                ['عفشة منخفضة (Coilovers)', 9500, 'lic'],
                ['عفشة هوائية ذكية (Air Suspension)', 22000, 'lic'],
                ['بارات تثبيت (Strut Bars)', 2200, 'ok'],
                ['قضبان ثبات (Sway Bars)', 3500, 'ok'],
                ['طقم فرامل رياضية كامل (BBK)', 12000, 'ok']] },
            { title: '🎨 الشكل والستايل', note: 'خلّى عربيتك تلفت الأنظار', p: 1, items: [
                ['تغليف كامل بـ الورق (Wrap)', 18000, 'lic'],
                ['دهان ماتّ / لامع', 12000, 'lic'],
                ['حماية لـ الدهان (PPF)', 15000, 'ok'],
                ['جنوط رياضية', 7000, 'ok'],
                ['جنوط بـ تغيّر لونها (Chameleon)', 9000, 'ok'],
                ['تلوين الـ كاليبرز', 1500, 'ok'],
                ['كابوت وسبويلر كربون فايبر', 20000, 'lic']] },
            { title: '💡 الإضاءة', note: 'إضاءة تنوّر وتفرّح', p: 1, items: [
                ['كشافات LED عالية الكفاءة', 2000, 'lic'],
                ['كشافات ليزر / ماتريكس (Retrofit)', 12000, 'lic'],
                ['إضاءة داخلية RGB', 1200, 'ok'],
                ['إضاءة ترحيب بـ شعار البطة على الأرض', 1500, 'ok'],
                ['نيون تحت العربية (Underglow)', 1800, 'lic']] },
            { title: '🛋️ الداخل والراحة', note: 'كابينة أحلامك', p: 1, items: [
                ['تنجيد جلد كامل', 10000, 'ok'],
                ['غطاء طارة مخصص', 800, 'ok'],
                ['دريكسيون رياضى بـ لمبات تغيير السرعات', 7500, 'ok'],
                ['عزل صوت وحرارة شامل (Dynamat)', 6500, 'ok'],
                ['فاميه عزل حرارى', 3500, 'lic'],
                ['رسم جرافيتى على التابلوه أو السقف', 5000, 'ok']] },
            { title: '📱 تكنولوجيا الكابينة', note: 'شاشة وموبايل وخرائط بسهولة', p: 1, items: [
                ['شاشة Apple CarPlay / Android Auto', 5500, 'ok'],
                ['عرض السرعة على الزجاج (HUD)', 4500, 'ok'],
                ['لوحة عدادات رقمية', 6000, 'ok']] },
            { title: '🔊 الصوت', note: 'سيستم يخلى الشارع كله يسمعك', p: 1, items: [
                ['سيستم صوت كامل', 5000, 'ok'],
                ['سب ووفر وأمبلفاير', 3500, 'ok'],
                ['عازل صوت لـ الأبواب', 2500, 'ok']] },
            { title: '🔬 خدمات القياس والضبط', note: 'اعرف قوة عربيتك الحقيقية', p: 0, items: [
                ['قياس القوة الحقيقية على الداينو (Dyno)', 2500, 'ok'],
                ['موازنة أوزان العربية (Corner Weighting)', 1500, 'ok'],
                ['ظبط زوايا العجل (Alignment)', 600, 'ok'],
                ['دراى كلين وتنظيف عميق للموتور والصالون', 1800, 'ok']] },
            { title: '📦 باكيدجات جاهزة', note: 'من غير لخبطة.. اختار باكيدج وخلاص', p: 2, items: [
                ['باكيدج الصيف: تكييف + عزل حرارة + تنظيف دورى', 4500, 'ok'],
                ['باكيدج الشياكة: تنجيد + إضاءة داخلية + تلميع', 13000, 'ok'],
                ['باكيدج السفر: عزل صوت + فحص شامل + فلتر رياضى', 7000, 'ok']] },
            { title: '🦆🚀 معمل البطة المجنون', note: 'أفكار للضحك بس.. لسه مش موجودة 😄', crazy: true, p: 3, items: [
                ['كلاكس بيقول "كواك"', 'الثمن: ضحكة', 'joke'],
                ['كلاكس البطة الزعلانة (Angry Duck Horn)', 'الثمن: ضحكة', 'joke'],
                ['زرار الـ نيترو الوهمى (صوت ونور بس!)', 'الثمن: شوية دلع', 'joke'],
                ['دخان شكمان ملون (قوس قزح)', 'الثمن: مفاجأة', 'joke'],
                ['حساس ركن بطة بتتريق عليك', 'الثمن: كرامتك', 'joke'],
                ['فرقعة الـ شكمان الصوتية (Pop & Bangs)', 'الثمن: ضحكة', 'joke'],
                ['عجلات على شكل أقدام بطة', 'الثمن: شوية دلع', 'joke'],
                ['عادم يطلّع فقاعات صابون', 'الثمن: كيس مناديل', 'joke'],
                ['زرار الطيران (لسه تحت التجربة)', 'الثمن: بطة تانية', 'joke'],
                ['مقعد حمام سباحة صغير', 'الثمن: مايوه', 'joke']] }
        ];

        function renderWorkshop() {
            const grid = document.getElementById('mod-grid');
            if (!grid) return;
            const tags = { ok: ['تعديل متاح', 'tag-ok'], lic: ['يحتاج ترخيص', 'tag-lic'], joke: ['فكرة مجنونة', 'tag-joke'] };
            grid.innerHTML = MOD_DATA.map(c => `
                <div class="mod-card ${c.crazy ? 'crazy' : ''}">
                    <h3>${c.title}</h3>
                    <div class="mod-note">${c.note}</div>
                    ${c.items.map(i => `
                        <label class="mod-item">
                            <span><input type="checkbox" class="mod-chk" data-p="${c.p}" data-v="${typeof i[1] === 'number' ? i[1] : 0}" data-n="${i[0].replace(/"/g, '&quot;')}">${i[0]} <span class="mod-tag ${tags[i[2]][1]}">${tags[i[2]][0]}</span></span>
                            <span class="mod-price">${typeof i[1] === 'number' ? 'تبدأ من ' + i[1].toLocaleString('en-US') + ' EGP' : i[1]}</span>
                        </label>`).join('')}
                </div>`).join('');
            grid.addEventListener('change', updateCrazyMeter);
        }

        function updateCrazyMeter() {
            let score = 0, total = 0, count = 0;
            document.querySelectorAll('.mod-chk:checked').forEach(c => {
                score += +c.dataset.p; total += +c.dataset.v; count++;
            });
            let level = 'اختار تعديلات وشوف مستوى جنانك 🦆';
            if (count) {
                level = score <= 4 ? 'عاقل 😇' : score <= 10 ? 'مجنون نص نص 🤪' : score <= 18 ? 'مجنون رسمى 🔥' : 'بطة متطورة 🦆🚀';
                level = 'مستوى الجنان: ' + level;
            }
            document.getElementById('mm-level').textContent = level;
            document.getElementById('mm-info').textContent = count ? `${count} تعديل • تقديرى من ${total.toLocaleString('en-US')} EGP` : '';
            document.getElementById('mm-fill').style.width = Math.min(100, score / 22 * 100) + '%';
        }

        function runStyleQuiz() {
            const use = document.getElementById('q-use').value;
            const want = document.getElementById('q-want').value;
            const bud = document.getElementById('q-bud').value;
            let rec;
            if (want === 'comfort') rec = 'باكيدج الصيف (تكييف + عزل حرارة + تنظيف دورى)';
            else if (want === 'speed') rec = bud === 'low' ? 'Stage 0.5 - باكيدج الميزانية' : bud === 'mid' ? 'Stage 1 + بارات تثبيت (Strut Bars)' : 'Stage 2 + طقم فرامل رياضية (BBK)';
            else rec = bud === 'low' ? 'إضاءة داخلية RGB + تلميع' : bud === 'mid' ? 'باكيدج الشياكة (تنجيد + إضاءة داخلية + تلميع)' : 'تغليف كامل (Wrap) + جنوط رياضية + إضاءة ترحيب بـ شعار البطة';
            const extra = use === 'travel' ? ' ويفضل تضيف عزل الصوت والحرارة لراحة السفر.' : use === 'show' ? ' وضيف لمسة من معمل البطة المجنون 🦆😄' : '';
            document.getElementById('q-result').textContent = '🎯 ترشيحنا ليك: ' + rec + '.' + extra;
        }

        function sendModRequest() {
            const name = document.getElementById('mod-name').value.trim();
            const car = document.getElementById('mod-car').value.trim();
            const idea = document.getElementById('mod-idea').value.trim();
            const picked = [...document.querySelectorAll('.mod-chk:checked')].map(c => '- ' + c.dataset.n);
            if (!idea && !picked.length) { alert('اكتب فكرتك أو اختار تعديل الأول يا بطل 🦆'); return; }
            const msg = `طلب تعديل من الورشة المجنونة 🔥\nالاسم: ${name || '-'}\nالعربية: ${car || '-'}\n` +
                (picked.length ? `التعديلات المختارة:\n${picked.join('\n')}\n` : '') + (idea ? `الفكرة: ${idea}` : '');
            openWhatsApp(msg);
        }

        /* EXCLUSIVE DAILY OFFER */
        const DAILY_OFFERS = [
            'خصم 50 جنيه على الغسيل الخارجى',
            'خصم 100 جنيه على التنظيف الداخلى العميق',
            'خصم 75 جنيه على غسيل المحرك بالكيماوى',
            'خصم 150 جنيه على التلميع والشمع',
            'فحص الكمبيوتر بنص السعر',
            'فحص فرامل مجانى مع أى صيانة',
            'مشروب مجانى من استراحة البطة مع أى خدمة',
            'خصم 15% على تغيير الزيت والفلتر',
            'غسيل خارجى هدية مع أى فحص أو برمجة',
            'خصم 20% على إكسسوارات السيارات',
            'فحص شامل قبل السفر مجاناً'
        ];

        function dayIndex(d) { return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }

        function todaysOffer() {
            const now = new Date();
            return {
                text: DAILY_OFFERS[dayIndex(now) % DAILY_OFFERS.length],
                code: 'DUCK-' + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0')
            };
        }

        function updateCouponTimers() {
            const now = new Date();
            const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const s = Math.max(0, Math.floor((end - now) / 1000));
            const p = n => String(n).padStart(2, '0');
            const txt = `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
            document.querySelectorAll('.c-timer-val').forEach(el => el.textContent = txt);
        }
        setInterval(updateCouponTimers, 1000);

        function showExclusiveOffer() {
            const body = document.getElementById('chat-body');
            const typing = document.createElement('div');
            typing.className = 'chat-msg bot duck-typing';
            typing.textContent = '🦆 البطة بتفتح صندوق عرض النهاردة... 🎁';
            body.appendChild(typing);
            body.scrollTop = body.scrollHeight;

            setTimeout(() => {
                const o = todaysOffer();
                typing.className = 'chat-msg bot coupon-msg';
                typing.innerHTML = `
                    <div class="coupon">
                        <div class="c-shine"></div>
                        <div class="c-head">🎁 عرض النهاردة الحصرى 🎁</div>
                        <div class="c-offer">${o.text}</div>
                        <div class="c-code">${o.code}</div>
                        <div class="c-timer">⏳ ينتهى بعد <span class="c-timer-val">--:--:--</span></div>
                        <div class="c-foot">فوق العروض الموجودة أصلاً • بكرة عرض مفاجأة 🤫🦆</div>
                    </div>`;
                updateCouponTimers();
                body.scrollTop = body.scrollHeight;
            }, 1300);
        }

        /* CHATBOT */
        let currentChatAudio = null;

        function stopChatSound() {
            if (currentChatAudio) {
                currentChatAudio.pause();
                currentChatAudio.currentTime = 0;
                currentChatAudio = null;
            }
        }

        function playChatSound(file) {
            stopChatSound();
            try {
                currentChatAudio = new Audio(file);
                const p = currentChatAudio.play();
                if (p && p.catch) p.catch(() => {});
            } catch (e) {}
        }

        function toggleChatbot() {
            const win = document.getElementById('chat-window');
            win.classList.toggle('show');
            if (win.classList.contains('show')) {
                playChatSound('hi.oga');
            } else {
                stopChatSound();
            }
        }

        function askChatbot(topic) {
            const answers = {
                'المواعيد': 'مواعيد العمل يومياً من 10 صباحاً حتى 10 مساءً ⏰🦆',
                'العنوان': 'الفرع الرئيسى: التجمع الخامس أمام الجامعة الأمريكية. الفرع الثانى: مدينة نصر شارع عباس العقاد 📍🦆',
            };
            const sounds = { 'المواعيد': 'time.oga', 'العنوان': 'address.oga' };
            const body = document.getElementById('chat-body');

            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user';
            userMsg.textContent = topic;
            body.appendChild(userMsg);

            if (topic === 'الخصم الحصرى') {
                body.scrollTop = body.scrollHeight;
                stopChatSound();
                showExclusiveOffer();
                return;
            }

            const botMsg = document.createElement('div');
            botMsg.className = 'chat-msg bot';
            botMsg.textContent = answers[topic] || 'مش فاهمة قصدك يا بطوطتى، جرّب أحد الأزرار تحت 🦆';
            body.appendChild(botMsg);

            body.scrollTop = body.scrollHeight;
            if (sounds[topic]) playChatSound(sounds[topic]);
        }

        /* LOUNGE ORDER RECEIPT */
        let lastLoungeOrder = null;

        function splitName(n) {
            const hasAr = s => /[\u0600-\u06FF]/.test(s);
            const m = n.match(/^(.*)\(([^()]*)\)\s*$/);
            if (m) {
                const main = m[1].trim(), par = m[2].trim();
                if (hasAr(main) && !hasAr(par) && /[A-Za-z]/.test(par)) return { ar: main, en: par };
                if (!hasAr(main) && /[A-Za-z]/.test(main) && hasAr(par)) return { ar: par, en: main };
            }
            return { ar: n, en: n };
        }

        function placeLoungeOrder() {
            const name = document.getElementById('lounge-customer-name').value.trim();
            const items = [];
            let total = 0;

            document.querySelectorAll('#section-snack select').forEach(sel => {
                if (sel.selectedIndex <= 0) return;
                const txt = sel.options[sel.selectedIndex].text.trim();
                const m = txt.match(/^(.*)\s-\s(\d+)\s*EGP$/);
                if (m) {
                    items.push({ name: m[1].trim(), price: parseInt(m[2], 10) });
                    total += parseInt(m[2], 10);
                }
            });

            if (!name) { alert('من فضلك اكتب اسمك الأول. / Please enter your name first.'); return; }
            if (!items.length) { alert('اختار طلب واحد على الأقل من القوائم. / Please choose at least one item.'); return; }

            const now = new Date();
            lastLoungeOrder = { name, items, total, now, orderNo: 'DL-' + String(now.getTime()).slice(-6) };
            renderReceipt();
            document.getElementById('lounge-receipt').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function renderReceipt() {
            if (!lastLoungeOrder) return;
            const o = lastLoungeOrder;
            const en = document.getElementById('lounge-receipt-lang').value === 'en';
            const receipt = document.getElementById('lounge-receipt');
            const L = en
                ? { sub: 'Duck Lounge - Receipt', name: 'Name', no: 'Order No.', date: 'Date', total: 'Total', thanks: 'Thank you for visiting Duck Lounge 🦆💛' }
                : { sub: 'استراحة البطة - إيصال الحساب', name: 'الاسم', no: 'رقم الطلب', date: 'التاريخ', total: 'الإجمالى', thanks: 'شكراً لزيارتك استراحة البطة 🦆💛' };
            const loc = en ? 'en-GB' : 'ar-EG';
            const safeName = o.name.replace(/&/g, '&amp;').replace(/</g, '&lt;');

            const rows = o.items.map(it => {
                const nm = splitName(it.name)[en ? 'en' : 'ar'];
                return `<tr><td style="padding:4px 0;">${nm}</td><td style="padding:4px 0; text-align:${en ? 'right' : 'left'}; white-space:nowrap;">${it.price} EGP</td></tr>`;
            }).join('');

            receipt.style.direction = en ? 'ltr' : 'rtl';
            receipt.style.textAlign = en ? 'left' : 'right';
            receipt.innerHTML = `
                <div style="text-align:center; border-bottom:2px dashed #000; padding-bottom:10px; margin-bottom:10px;">
                    <h3 style="margin:0; color:#000;">🦆 DUCKY MOTORS</h3>
                    <div style="font-size:14px;">${L.sub}</div>
                </div>
                <div style="font-size:14px; margin-bottom:8px;">
                    <div>${L.name}: <b>${safeName}</b></div>
                    <div>${L.no}: <b>${o.orderNo}</b></div>
                    <div>${L.date}: ${o.now.toLocaleDateString(loc)} - ${o.now.toLocaleTimeString(loc, {hour:'2-digit', minute:'2-digit'})}</div>
                </div>
                <table style="width:100%; font-size:14px; border-top:1px dashed #000; border-bottom:1px dashed #000; margin:8px 0;">${rows}</table>
                <div style="display:flex; justify-content:space-between; font-size:18px; font-weight:900;">
                    <span>${L.total}</span><span>${o.total} EGP</span>
                </div>
                <div style="text-align:center; margin-top:12px; font-size:13px;">${L.thanks}</div>
            `;
            receipt.style.display = 'block';
        }

        function handleLogin(event) {
            event.preventDefault();
            const name = document.getElementById('username').value.trim();
            if (!name) return;

            // رقم عضوية ثابت لكل اسم
            let h = 0;
            for (let k = 0; k < name.length; k++) h = (h * 31 + name.charCodeAt(k)) % 9000;
            const memberId = '#DUCK-' + (1000 + h);

            customerName = name;
            document.getElementById('user-display-name').textContent = name;
            document.getElementById('user-member-id').textContent = memberId;
            document.getElementById('donation-user-id').value = memberId;
            const orderName = document.getElementById('lounge-customer-name');
            if (orderName && !orderName.value) orderName.value = name;

            document.getElementById('login-box').style.display = 'none';
            document.getElementById('dashboard-box').style.display = 'block';
            renderOrderHistory();
        }

        function handleLogout() {
            document.getElementById('login-box').style.display = 'block';
            document.getElementById('dashboard-box').style.display = 'none';
        }
    



/* ===================== إعدادات المركز (مكان واحد للأرقام) ===================== */
const SHOP = {
    whatsapp: '201044503749',
    instapay: '01145685611',
    cash: '01044503749',
    depositRate: 0.2          // نسبة العربون فى الورشة المجنونة
};
const ORDERS_KEY = 'ducky_orders_v1';
const CHARITY_KEY = 'ducky_charity_v1';

/* ===================== أدوات صغيرة ===================== */
function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const money = n => '\u200E' + Number(n).toLocaleString('en-US') + ' EGP\u200E';   // علامة اتجاه عشان الرقم ما ينعكسش فى النص العربى
function storeGet(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
}
function storeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* التخزين غير متاح */ }
}
function normDigits(s) { return String(s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)); }
function openWhatsApp(text) {
    window.open('https://wa.me/' + SHOP.whatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
}
charityTotal = storeGet(CHARITY_KEY, charityTotal);

const METHODS = {
    invoice:  { icon: '🧾', label: 'على الفاتورة (دفع يدوى فى المركز)' },
    instapay: { icon: '📲', label: 'إنستاباى', number: SHOP.instapay },
    cash:     { icon: '💵', label: 'كاش (محفظة إلكترونية)', number: SHOP.cash }
};

/* ===================== نافذة الدفع الموحدة ===================== */
let co = null;
let coReturnFocus = null;

function openCheckout(cfg) {
    co = Object.assign({ step: 'details', title: '', items: [], total: 0, note: '', fields: [], details: {},
                         split: false, invoicePart: 0, method: 'invoice', error: '', onDone: null }, cfg);
    if (co.split) { co.invoicePart = co.total; co.method = 'instapay'; }
    if (!co.fields.length) co.step = 'pay';
    coReturnFocus = document.activeElement;
    document.getElementById('checkout-modal').classList.add('show');
    document.body.classList.add('modal-open');
    renderCheckout();
    document.querySelector('#checkout-modal .co-dialog').focus();
}

function closeCheckout() {
    if (!co) return;
    document.getElementById('checkout-modal').classList.remove('show');
    document.body.classList.remove('modal-open');
    co = null;
    if (coReturnFocus && coReturnFocus.focus) coReturnFocus.focus();
}

function coBackdrop(el, e) { if (e && e.target === el) closeCheckout(); }

function coStepsHtml() {
    const names = co.fields.length ? ['البيانات', 'الدفع', 'التأكيد'] : ['الدفع', 'التأكيد'];
    const cur = names.indexOf({ details: 'البيانات', pay: 'الدفع', done: 'التأكيد' }[co.step]);
    return '<div class="co-steps">' + names.map((n, i) => `<span class="${i === cur ? 'on' : ''}">${i + 1}. ${n}</span>`).join('') + '</div>';
}

function coFieldHtml(f) {
    const v = co.details[f.id] !== undefined ? co.details[f.id] : (f.value || '');
    const attrs = [f.required ? 'required' : '', f.min ? `min="${esc(f.min)}"` : '', f.inputmode ? `inputmode="${f.inputmode}"` : '',
                   f.placeholder ? `placeholder="${esc(f.placeholder)}"` : '', `maxlength="${f.max || 60}"`].filter(Boolean).join(' ');
    if (f.type === 'select') {
        return `<label class="co-field"><span>${esc(f.label)}</span><select id="co-f-${f.id}">` +
            f.options.map(o => `<option value="${esc(o[0])}"${o[0] === v ? ' selected' : ''}>${esc(o[1])}</option>`).join('') + '</select></label>';
    }
    return `<label class="co-field"><span>${esc(f.label)}${f.required ? ' *' : ''}</span><input id="co-f-${f.id}" type="${f.type || 'text'}" value="${esc(v)}" ${attrs}></label>`;
}

function coSummaryHtml() {
    return '<ul class="co-items">' + co.items.map(i =>
        `<li><span>${esc(i.name)}</span><b>${i.price ? (i.est ? 'من ' : '') + money(i.price) : ''}</b></li>`).join('') + '</ul>' +
        (co.note ? `<p class="co-note">${esc(co.note)}</p>` : '') +
        `<div class="co-total"><span>${co.split || co.deposit ? 'المطلوب' : 'الإجمالى'}</span><span>${money(co.total)}</span></div>`;
}

function coMethodsHtml() {
    const keys = co.split ? ['instapay', 'cash'] : ['invoice', 'instapay', 'cash'];
    return '<div class="co-methods" role="radiogroup" aria-label="طريقة الدفع">' + keys.map(k =>
        `<label class="co-method"><input type="radio" name="co-method" value="${k}" data-change="coPickMethod"${co.method === k ? ' checked' : ''}>` +
        `<span>${METHODS[k].icon} ${METHODS[k].label}</span></label>`).join('') + '</div>';
}

function coOnlineAmount() { return co.split ? co.total - co.invoicePart : (co.method === 'invoice' ? 0 : co.total); }

function coPayInfoHtml() {
    const amt = coOnlineAmount();
    const m = METHODS[co.method];
    if (!m || !m.number || amt <= 0) return '';
    return `<div class="co-pay-info">حوّل <b>${money(amt)}</b> على ${m.icon} ${esc(m.label)}:
        <div class="co-number"><bdi>${esc(m.number)}</bdi>
            <button type="button" class="co-copy" data-click="coCopy" data-args='["${m.number}"]'>نسخ</button></div>
        <small>بعد التحويل اضغط "تأكيد الطلب"، وابعتلنا صورة التحويل على واتساب برقم الطلب.</small></div>`;
}

function coSplitHtml() {
    return `<div class="co-split">
        <p class="co-split-title">قسّم المبلغ زى ما تحب:</p>
        <div class="co-presets">
            <button type="button" data-click="coPreset" data-args='["all-invoice"]'>كله على الفاتورة</button>
            <button type="button" data-click="coPreset" data-args='["half"]'>نص ونص</button>
            <button type="button" data-click="coPreset" data-args='["all-online"]'>كله دلوقتى</button>
        </div>
        <label class="co-field"><span>الجزء اللى يتضاف على الفاتورة (EGP)</span>
            <input id="co-invoice-part" type="number" min="0" max="${co.total}" step="1" inputmode="numeric" value="${co.invoicePart}" data-input="coSplitInput"></label>
        <p class="co-split-sum">🧾 على الفاتورة: <b id="co-sum-inv"></b> &nbsp;•&nbsp; 📲 أونلاين دلوقتى: <b id="co-sum-online"></b></p>
        <div id="co-method-wrap">${coMethodsHtml()}</div>
    </div>`;
}

function renderCheckout() {
    if (!co) return;
    const body = document.getElementById('checkout-body');
    let html = `<h2 class="co-title" id="co-title">${esc(co.title)}</h2>` + coStepsHtml();

    if (co.step === 'details') {
        html += '<form data-submit="coDetailsNext" novalidate>' + co.fields.map(coFieldHtml).join('') +
            (co.error ? `<p class="co-error" role="alert">${esc(co.error)}</p>` : '') +
            '<button type="submit" class="btn-submit">التالى: الدفع ←</button></form>';
    } else if (co.step === 'pay') {
        html += coSummaryHtml() + (co.split ? coSplitHtml() : coMethodsHtml()) + '<div id="co-info"></div>' +
            (co.error ? `<p class="co-error" role="alert">${esc(co.error)}</p>` : '') +
            '<div class="co-actions"><button type="button" class="btn-submit" data-click="coConfirm">تأكيد الطلب ✅</button>' +
            (co.fields.length ? '<button type="button" class="co-btn-secondary" data-click="coBack">→ رجوع</button>' : '') + '</div>';
    } else {
        html += coReceiptHtml(co.order);
    }
    body.innerHTML = html;
    if (co.step === 'pay') coRefreshPay();
}

function coRefreshPay() {
    const info = document.getElementById('co-info');
    if (info) info.innerHTML = coPayInfoHtml();
    if (co.split) {
        document.getElementById('co-sum-inv').textContent = money(co.invoicePart);
        document.getElementById('co-sum-online').textContent = money(co.total - co.invoicePart);
        document.getElementById('co-method-wrap').hidden = (co.total - co.invoicePart) <= 0;
    }
}

function coPickMethod(el) { co.method = el.value; coRefreshPay(); }

function coPreset(kind) {
    co.invoicePart = kind === 'all-invoice' ? co.total : kind === 'half' ? Math.floor(co.total / 2) : 0;
    document.getElementById('co-invoice-part').value = co.invoicePart;
    coRefreshPay();
}

function coSplitInput(el) {
    let v = parseInt(normDigits(el.value), 10);
    if (isNaN(v) || v < 0) v = 0;
    co.invoicePart = Math.min(v, co.total);
    coRefreshPay();
}

function coBack() { co.step = 'details'; co.error = ''; renderCheckout(); }

function coDetailsNext(e) {
    e.preventDefault();
    co.error = '';
    for (const f of co.fields) {
        const el = document.getElementById('co-f-' + f.id);
        co.details[f.id] = el ? el.value.trim() : '';
    }
    for (const f of co.fields) {
        const v = co.details[f.id];
        if (f.required && !v) { co.error = 'من فضلك املا: ' + f.label; break; }
        if (f.id === 'phone' && v) {
            co.details.phone = normDigits(v);
            if (!/^01[0125]\d{8}$/.test(co.details.phone)) { co.error = 'رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01'; break; }
        }
    }
    if (co.error) { renderCheckout(); return; }
    co.step = 'pay';
    renderCheckout();
}

function coCopy(number, btn) {
    const done = () => { btn.textContent = 'اتنسخ ✓'; setTimeout(() => { btn.textContent = 'نسخ'; }, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(number).then(done, () => {});
    } else {
        const t = document.createElement('textarea'); t.value = number; document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); done(); } catch (err) {} t.remove();
    }
}

function coConfirm() {
    co.error = '';
    if (!(co.total > 0)) { co.error = 'المبلغ لازم يكون أكبر من صفر'; renderCheckout(); return; }
    const payments = [];
    if (co.split) {
        const inv = Math.min(Math.max(co.invoicePart, 0), co.total), online = co.total - inv;
        if (inv > 0) payments.push({ method: 'invoice', amount: inv });
        if (online > 0) payments.push({ method: co.method, amount: online });
    } else {
        payments.push({ method: co.method, amount: co.total });
    }
    const extra = co.fields.filter(f => f.id !== 'name' && f.id !== 'phone' && co.details[f.id]).map(f => ({
        label: f.label,
        value: f.type === 'select' ? ((f.options.find(o => o[0] === co.details[f.id]) || [])[1] || co.details[f.id]) : co.details[f.id]
    }));
    const order = {
        id: 'DK-' + String(Date.now()).slice(-6),
        kind: co.kind, title: co.title, name: co.details.name || '', phone: co.details.phone || '',
        extra, items: co.items, total: co.total, payments,
        status: payments.some(p => p.method !== 'invoice') ? 'pending' : 'invoice',
        ts: Date.now()
    };
    const orders = storeGet(ORDERS_KEY, []);
    orders.unshift(order);
    storeSet(ORDERS_KEY, orders.slice(0, 30));
    if (co.onDone) co.onDone(order);
    renderOrderHistory();
    co.order = order;
    co.step = 'done';
    renderCheckout();
}

function statusLabel(s) { return s === 'pending' ? 'بانتظار تأكيد التحويل ⏳' : 'تتحاسب على الفاتورة 🧾'; }

function coReceiptHtml(o) {
    return `<div class="co-receipt">
        <div class="co-ok">✅</div>
        <h3>تم تسجيل طلبك!</h3>
        <p>رقم الطلب: <b>${esc(o.id)}</b></p>
        <ul class="co-items">${o.items.map(i => `<li><span>${esc(i.name)}</span><b>${i.price ? (i.est ? 'من ' : '') + money(i.price) : ''}</b></li>`).join('')}</ul>
        ${o.extra.map(x => `<p class="co-line">${esc(x.label)}: <b>${esc(x.value)}</b></p>`).join('')}
        ${o.payments.map(p => `<p class="co-line">${METHODS[p.method].icon} ${esc(METHODS[p.method].label)}: <b>${money(p.amount)}</b></p>`).join('')}
        <div class="co-total"><span>الإجمالى</span><span>${money(o.total)}</span></div>
        <p class="co-note">الحالة: ${statusLabel(o.status)}${o.status === 'pending' ? '<br>ابعت صورة التحويل على واتساب برقم الطلب عشان نأكد.' : ''}</p>
        <div class="co-actions">
            <button type="button" class="co-wa" data-click="coWhatsapp">ابعت التأكيد على واتساب 💬</button>
            <button type="button" class="co-btn-secondary" data-click="closeCheckout">تمام</button>
        </div></div>`;
}

function coWhatsapp() {
    const o = co && co.order;
    if (!o) return;
    const lines = [`طلب جديد من موقع DUCKY MOTORS 🦆`, `رقم الطلب: ${o.id}`, `النوع: ${o.title}`];
    if (o.name) lines.push(`الاسم: ${o.name}`);
    if (o.phone) lines.push(`الموبايل: ${o.phone}`);
    o.extra.forEach(x => lines.push(`${x.label}: ${x.value}`));
    lines.push('البنود:');
    o.items.forEach(i => lines.push(`- ${i.name}${i.price ? ' — ' + (i.est ? 'من ' : '') + money(i.price) : ''}`));
    lines.push(`الإجمالى: ${money(o.total)}`);
    lines.push('الدفع: ' + o.payments.map(p => `${METHODS[p.method].label} ${money(p.amount)}`).join(' + '));
    if (o.status === 'pending') lines.push('حوّلت المبلغ، وهبعت صورة التحويل 👇');
    openWhatsApp(lines.join('\n'));
}

/* ===================== سجل الطلبات فى حساب العميل ===================== */
function renderOrderHistory() {
    const box = document.getElementById('order-history');
    if (!box) return;
    const orders = storeGet(ORDERS_KEY, []);
    if (!orders.length) { box.innerHTML = '<p class="order-empty">مفيش طلبات لسه. أى حجز أو دفع هتعمله هيظهر هنا 🦆</p>'; return; }
    box.innerHTML = '<ul class="order-list">' + orders.map(o =>
        `<li class="order-card"><div><b>${esc(o.title)}</b><small>${esc(o.id)} • ${esc(new Date(o.ts).toLocaleDateString('ar-EG'))}</small></div>
         <div class="order-side"><b>${money(o.total)}</b><span class="badge badge-${esc(o.status)}">${statusLabel(o.status)}</span></div></li>`).join('') + '</ul>';
}

function clearOrders() {
    if (!storeGet(ORDERS_KEY, []).length) return;
    if (confirm('تمسح سجل الطلبات من الجهاز ده؟')) { storeSet(ORDERS_KEY, []); renderOrderHistory(); }
}

/* ===================== ربط الأقسام بنافذة الدفع ===================== */
function nameFields(extra) {
    return [{ id: 'name', label: 'الاسم', required: true, value: customerName || '', max: 60 },
            { id: 'phone', label: 'رقم الموبايل (واتساب)', required: true, type: 'tel', inputmode: 'numeric', placeholder: '01xxxxxxxxx', max: 11 }].concat(extra || []);
}

/* حاسبة التكلفة + حجز الخدمة */
function calcQuote() {
    const carSel = document.getElementById('calc-car-type'), svcSel = document.getElementById('calc-service-type');
    const full = Math.round(parseFloat(svcSel.value) * parseFloat(carSel.value));
    return {
        full, price: Math.round(full * 0.5),
        service: svcSel.options[svcSel.selectedIndex].text.replace(/\s*\([^)]*EGP\)\s*$/, '').trim(),
        car: carSel.options[carSel.selectedIndex].text.trim()
    };
}

function calculatePrice() {
    const q = calcQuote();
    document.getElementById('calc-price-old').textContent = q.full + ' EGP';
    document.getElementById('calc-price-discount').textContent = q.price + ' EGP';
}

function todayStr() {
    const d = new Date(), p = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function openServiceCheckout(prefill) {
    const pre = (prefill && prefill.date !== undefined) ? prefill : {};
    const q = calcQuote();
    openCheckout({
        kind: 'service', title: 'حجز خدمة أونلاين',
        items: [{ name: q.service + ' — ' + q.car, price: q.price }],
        total: q.price,
        note: 'السعر بعد خصم 50% (السعر الأصلى ' + money(q.full) + ').',
        details: pre.date ? { date: pre.date, mode: pre.mode } : {},
        fields: nameFields([
            { id: 'date', label: 'اليوم المفضل', type: 'date', required: true, min: todayStr(), max: 10 },
            { id: 'mode', label: 'طريقة الخدمة', type: 'select', options: [['branch', 'هحضر للفرع 🚗'], ['butler', 'خادم البطة (استلام وتسليم من البيت) 🏎️']] }
        ])
    });
}

function handleBookingSubmit(e) {
    e.preventDefault();
    openServiceCheckout({ date: document.getElementById('booking-date').value, mode: document.getElementById('booking-type').value });
}

/* استراحة البطة */
function checkoutLounge() {
    lastLoungeOrder = null;
    placeLoungeOrder();            // بيراجع الاختيارات الحالية ويطلّع الريسيت
    const o = lastLoungeOrder;
    if (!o) return;
    openCheckout({
        kind: 'lounge', title: 'طلب استراحة البطة',
        items: o.items.map(i => ({ name: splitName(i.name).ar, price: i.price })),
        total: o.total,
        details: { name: o.name },
        fields: [{ id: 'name', label: 'الاسم', required: true, max: 60 }]
    });
}

/* الورشة المجنونة: عربون على التعديلات المختارة */
function openModsCheckout() {
    const picked = [...document.querySelectorAll('.mod-chk:checked')].filter(c => +c.dataset.v > 0);
    if (!picked.length) { alert('اختار تعديل ليه سعر الأول يا بطل 🦆 (أفكار "معمل البطة المجنون" للضحك بس)'); return; }
    const est = picked.reduce((s, c) => s + (+c.dataset.v), 0);
    const deposit = Math.min(est, Math.max(100, Math.round(est * SHOP.depositRate / 10) * 10));
    openCheckout({
        kind: 'mods', title: 'حجز تعديلات الورشة المجنونة',
        items: picked.map(c => ({ name: c.dataset.n, price: +c.dataset.v, est: true })),
        total: deposit, deposit: true,
        note: 'الأسعار تقديرية (إجماليها من ' + money(est) + '). بتدفع عربون ' + Math.round(SHOP.depositRate * 100) + '% دلوقتى، والباقى بعد المعاينة.',
        details: { name: document.getElementById('mod-name').value.trim() || customerName || '', car: document.getElementById('mod-car').value.trim() },
        fields: nameFields([{ id: 'car', label: 'نوع العربية وموديلها', max: 60 }])
    });
}

/* سهم الخير: تقسيم بين الفاتورة وإنستاباى/كاش */
function submitDonation() {
    const customVal = document.getElementById('custom-donation-input').value;
    const amount = customVal ? parseInt(normDigits(customVal), 10) : selectedDonation;
    const memberId = document.getElementById('donation-user-id').value.trim().slice(0, 20);
    if (!amount || amount <= 0 || amount > 100000) { alert('من فضلك اختار أو اكتب مبلغ صحيح (من 1 لحد 100,000 جنيه).'); return; }
    openCheckout({
        kind: 'donation', title: 'سهم الخير والصدقة 🌾',
        items: [{ name: 'سهم الخير' + (memberId ? ' — عضوية ' + memberId : ''), price: amount }],
        total: amount, split: true,
        details: { name: customerName || '' },
        fields: [{ id: 'name', label: 'الاسم (اختيارى)', max: 60 }],
        onDone: order => {
            charityTotal += amount;
            storeSet(CHARITY_KEY, charityTotal);
            updateCharityTotal();
            const msg = document.getElementById('donation-success-msg');
            msg.textContent = '🌱 تقبل الله منكم! تم تسجيل سهم الخير بقيمة ' + money(amount) + ' (رقم الطلب ' + order.id + ').';
            msg.style.display = 'block';
        }
    });
}

/* ===== Event wiring (replaces inline onclick / onchange / onsubmit / onerror) ===== */
const ACTIONS = {
    openServiceCheckout,
    openModsCheckout,
    checkoutLounge,
    closeCheckout,
    coBackdrop,
    coPickMethod,
    coPreset,
    coSplitInput,
    coBack,
    coDetailsNext,
    coCopy,
    coConfirm,
    coWhatsapp,
    clearOrders,
    toggleNav,
    askChatbot,
    calculatePrice,
    checkDuckTracker,
    closeSosModal,
    handleBookingSubmit,
    handleCarSellSubmit,
    handleInspectionSubmit,
    handleLogin,
    handleLogout,
    placeLoungeOrder,
    playDuckySound,
    renderReceipt,
    runStyleQuiz,
    selectDonationAmount,
    sendModRequest,
    submitDonation,
    submitDuckPuzzle,
    switchSectionAndBubble,
    toggleChatbot,
    triggerSosEmergency
};

function runAction(attr, el, e) {
    const fn = ACTIONS[el.dataset[attr]];
    if (!fn) return;
    const args = el.dataset.args ? JSON.parse(el.dataset.args) : [];
    if (attr === 'submit') fn(e); else fn(...args, el, e);
}

document.addEventListener('click', e => {
    const el = e.target.closest('[data-click]');
    if (el) runAction('click', el, e);
});
document.addEventListener('change', e => {
    const el = e.target.closest('[data-change]');
    if (el) runAction('change', el, e);
});
document.addEventListener('input', e => {
    const el = e.target.closest('[data-input]');
    if (el) runAction('input', el, e);
});
document.addEventListener('submit', e => {
    const el = e.target.closest('[data-submit]');
    if (el) runAction('submit', el, e);
});

/* Image fallbacks: swap a broken image for its placeholder (once) */
document.querySelectorAll('img[data-fallback]').forEach(img => {
    const useFallback = () => { img.src = img.dataset.fallback; };
    img.addEventListener('error', useFallback, { once: true });
    if (img.complete && img.naturalWidth === 0) useFallback();   // already failed before this script ran
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') { toggleNav(false); closeCheckout(); } });
