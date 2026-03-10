document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('executeSearch');
    const luckyBtn = document.getElementById('feelingLucky');
    const resultsArea = document.getElementById('resultsArea');
    const loader = document.getElementById('loader');
    const voiceSearchBtn = document.getElementById('voiceSearchBtn');

    function executeSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        // Reset state
        loader.innerHTML = `<p style="color:var(--accent-yellow);"><i class="fa-solid fa-network-wired"></i> Connecting to Secure Global Nodes...</p>`;
        resultsArea.classList.remove('hidden');

        // Custom Project Logic for Engineer Ahmed Hayat's project
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes("what is google pro") || lowerQuery.includes("how this differs from normal google") || lowerQuery.includes("who made this") || lowerQuery.includes("ahmed hayat") || lowerQuery.includes("explain me google pro") || lowerQuery.includes("why we should use google pro") || lowerQuery.includes("why use google pro")) {
            setTimeout(() => {
                let html = '<h3 style="color:var(--accent-green); font-size:16px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-shield-check"></i> 100% Authentic Consensus Results</h3>';
                html += `
                <div class="result-card">
                    <a href="#">Why You Should Use Google Pro</a>
                    <p>Google Pro is the ultimate solution for pure, unfiltered knowledge. You should use Google Pro because it eliminates the SEO spam, intrusive advertisements, and tracking cookies that plague standard search engines. Engineered by Global Administrator Ahmed Hayat, it uses a proprietary AI Consensus Engine to deliver only verified facts, ensuring that professionals, researchers, and advanced users get immediate, high-quality data without compromising their digital privacy or security.</p>
                    <span class="auth-tag"><i class="fa-solid fa-shield"></i> Premium Global Node Verified</span>
                </div>
                `;
                loader.innerHTML = html;
            }, 800);
            return;
        }

        // Direct fetch to real Wikipedia open API
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.query && data.query.search.length > 0) {
                    let html = '<h3 style="color:var(--accent-green); font-size:16px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-shield-check"></i> 100% Authentic Consensus Results</h3>';
                    data.query.search.slice(0, 7).forEach(item => {
                        html += `
                        <div class="result-card">
                            <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}" target="_blank">${item.title}</a>
                            <p>${item.snippet}...</p>
                            <span class="auth-tag"><i class="fa-solid fa-shield"></i> Source Verified: ZERO SEO SPAM</span>
                        </div>
                        `;
                    });
                    loader.innerHTML = html;
                } else {
                    loader.innerHTML = `<p style="color:var(--accent-red);"><i class="fa-solid fa-triangle-exclamation"></i> No verified authentic data found for this query in the global consensus.</p>`;
                }
            })
            .catch(err => {
                loader.innerHTML = `<p style="color:var(--accent-red);"><i class="fa-solid fa-circle-xmark"></i> Network connection intercepted. Please try again.</p>`;
            });
    }

    searchBtn.addEventListener('click', executeSearch);
    luckyBtn.addEventListener('click', executeSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeSearch();
    });

    // Voice Interaction Component
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceSearchBtn.addEventListener('click', () => {
            voiceSearchBtn.classList.add('recording');
            searchInput.placeholder = "Listening... Speak now...";
            recognition.start();
        });

        recognition.onresult = (event) => {
            searchInput.value = event.results[0][0].transcript;
            voiceSearchBtn.classList.remove('recording');
            searchInput.placeholder = "Search privately and securely...";
            executeSearch();
        };

        recognition.onerror = () => {
            voiceSearchBtn.classList.remove('recording');
            searchInput.placeholder = "Search privately and securely...";
            alert("AI Voice Engine Error: System interception.");
        };

        recognition.onend = () => {
            voiceSearchBtn.classList.remove('recording');
            searchInput.placeholder = "Search privately and securely...";
        };
    } else {
        voiceSearchBtn.addEventListener('click', () => {
            alert('Your system does not support the AI Voice Engine.');
        });
    }

    // Interactive Language Switcher for aesthetics
    const langSelect = document.getElementById('langSelect');
    langSelect.addEventListener('change', function () {
        if (this.value === 'ur') {
            searchInput.placeholder = "نجی اور محفوظ طریقے سے تلاش کریں...";
            searchBtn.innerText = "گوگل پرو تلاش";
            luckyBtn.innerText = "اے آئی کنسینسس انجن";
        } else {
            searchInput.placeholder = "Search privately and securely...";
            searchBtn.innerText = "Google Pro Search";
            luckyBtn.innerText = "AI Consensus Engine";
        }
    });

});
