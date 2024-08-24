// script.js

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

    // صفحة اللعبة
    if (document.querySelector('.game-section')) {
        let coins = parseInt(localStorage.getItem('coins')) || 100;
        let winCount = parseInt(localStorage.getItem('winCount')) || 0;
        let loseCount = parseInt(localStorage.getItem('loseCount')) || 0;

        document.getElementById('coins').textContent = coins;
        document.getElementById('win-count').textContent = winCount;
        document.getElementById('lose-count').textContent = loseCount;

        document.getElementById('place-bet').addEventListener('click', function() {
            let betAmount = parseInt(document.getElementById('bet-amount').value);
            if (isNaN(betAmount) || betAmount <= 0 || betAmount > coins) {
                alert('يرجى إدخال قيمة صحيحة للرهان.');
                return;
            }

            // حساب احتمالية الفوز والخسارة
            let round = (localStorage.getItem('betHistory') || []).split(',').length + 1;
            let winProbability = Math.max(0.1, 1 - (round / 10));
            let loseProbability = 1 - winProbability;
            
            if (Math.random() < winProbability) {
                coins += betAmount;
                winCount++;
            } else {
                coins -= betAmount;
                loseCount++;
            }

            if (betAmount > (localStorage.getItem('lastBet') || 0) * 2) {
                coins -= betAmount;
                loseCount++;
            }
            
            localStorage.setItem('coins', coins);
            localStorage.setItem('winCount', winCount);
            localStorage.setItem('loseCount', loseCount);

            let betHistory = (localStorage.getItem('betHistory') || '');
            betHistory += betAmount + ',';
            localStorage.setItem('betHistory', betHistory);
            localStorage.setItem('lastBet', betAmount);

            document.getElementById('coins').textContent = coins;
            document.getElementById('win-count').textContent = winCount;
            document.getElementById('lose-count').textContent = loseCount;
        });
    }

    // صفحة دعوة الأصدقاء
    if (document.querySelector('.invite-section')) {
        document.getElementById('send-invite').addEventListener('click', function() {
            let inviteCode = document.getElementById('invite-code').value;
            if (inviteCode) {
                alert('تم إرسال الدعوة بنجاح.');
                // يمكنك هنا إرسال الدعوة عبر البريد الإلكتروني أو عبر رابط
            }
        });

        document.getElementById('accept-invite').addEventListener('click', function() {
            let inviteCode = document.getElementById('invite-code').value;
            if (inviteCode) {
                alert('تم قبول الدعوة بنجاح.');
                // يمكنك هنا قبول الدعوة وتحديث حالة اللعبة
            }
        });
    }

    // صفحة الإعدادات الشخصية
    if (document.querySelector('#settings-form')) {
        document.getElementById('settings-form').addEventListener('submit', function(event) {
            event.preventDefault();
            let username = usernameInput.value;
            let email = emailInput.value;
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            alert('تم حفظ التغييرات بنجاح.');
        });

        // تعيين القيم في الحقول
        if (localStorage.getItem('username')) {
            usernameInput.value = localStorage.getItem('username');
        }
        if (localStorage.getItem('email')) {
            emailInput.value = localStorage.getItem('email');
        }
    }
});
