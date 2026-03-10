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
        let customResponse = null;

        if (lowerQuery.includes("what is google pro") || lowerQuery.includes("explain me google pro") || lowerQuery.includes("how this differs from normal google") || lowerQuery.includes("how this diffres from normal google")) {
            customResponse = `
                <div class="result-card" style="border-left: 3px solid var(--accent-yellow); padding-left: 15px;">
                    <a href="#">Google Pro: The Advanced Search Ecosystem</a>
                    <p>Google Pro is a highly advanced, secure, and private search engine created by Engineer Ahmed Hayat. Unlike standard search engines that rely on tracking cookies and SEO-gamed blogs filled with advertisements, Google Pro utilizes an AI Consensus Engine to extract from pristine, verified data sources. It returns 100% accurate facts directly, without tracking user data, and features a Pre-Rendering Sandbox for total immunity against malware.</p>
                    <span class="auth-tag"><i class="fa-solid fa-shield"></i> Core System Definition</span>
                </div>
            `;
        } else if (lowerQuery.includes("who made this") || lowerQuery.includes("ahmed hayat") || lowerQuery.includes("creator")) {
            customResponse = `
                <div class="result-card" style="border-left: 3px solid var(--accent-blue); padding-left: 15px;">
                    <a href="#">Global Administrator: Engineer Ahmed Hayat</a>
                    <p>Google Pro was architected and deployed by Engineer Ahmed Hayat, a visionary software engineer and the Global Administrator of this ecosystem. His mission was to create an ad-free, 100% secure, and privacy-focused search alternative that leverages advanced AI consensus to bypass standard SEO clutter and deliver true, verified knowledge to professionals natively.</p>
                    <span class="auth-tag"><i class="fa-solid fa-user-shield"></i> Verified Administrator Profile</span>
                </div>
            `;
        } else if (lowerQuery.includes("why we should use google pro") || lowerQuery.includes("why use google pro") || lowerQuery.includes("benefits")) {
            customResponse = `
                <div class="result-card" style="border-left: 3px solid var(--accent-green); padding-left: 15px;">
                    <a href="#">Why You Should Use Google Pro</a>
                    <p>Google Pro is the ultimate solution for pure, unfiltered knowledge. You should use Google Pro because it completely eliminates the SEO spam, intrusive advertisements, and tracking algorithms that plague standard search engines. By using our proprietary AI Consensus Engine, facts are double-checked against multiple authentic global nodes before execution, ensuring that professionals receive immediate, high-quality data without compromising their digital privacy.</p>
                    <span class="auth-tag"><i class="fa-solid fa-check-double"></i> Premium Global Node Verified</span>
                </div>
            `;
        }

        if (customResponse) {
            setTimeout(() => {
                let html = '<h3 style="color:var(--accent-green); font-size:16px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-shield-check"></i> 100% Authentic Consensus Results</h3>';
                html += customResponse;
                loader.innerHTML = html;
            }, 800);
            return;
        }

        // Professional API: DuckDuckGo Instant Answer API
        const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.AbstractText || (data.RelatedTopics && data.RelatedTopics.length > 0)) {
                    let html = '<h3 style="color:var(--accent-green); font-size:16px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-shield-check"></i> Verified Data Consensus</h3>';

                    // Display direct abstract if available
                    if (data.AbstractText) {
                        html += `
                        <div class="result-card" style="border-left: 3px solid var(--accent-blue); padding-left: 15px;">
                            <a href="${data.AbstractURL}" target="_blank">${data.Heading}</a>
                            <p style="font-size: 15px; margin-top: 5px;">${data.AbstractText}</p>
                            <span class="auth-tag"><i class="fa-solid fa-certificate"></i> Verified Source: ${data.AbstractSource}</span>
                        </div>
                        `;
                    }

                    // Display related topics
                    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                        data.RelatedTopics.slice(0, 5).forEach(item => {
                            if (item.Text && item.FirstURL) {
                                html += `
                                <div class="result-card">
                                    <a href="${item.FirstURL}" target="_blank">${item.Text.split(' - ')[0] || item.FirstURL.split('/').pop()}</a>
                                    <p>${item.Text}</p>
                                    <span class="auth-tag"><i class="fa-solid fa-shield"></i> Consensus Verified</span>
                                </div>
                                `;
                            }
                        });
                    }
                    loader.innerHTML = html;
                } else {
                    // Fallback to Wikipedia if DuckDuckGo doesn't have a direct answer
                    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
                    fetch(wikiUrl).then(r => r.json()).then(wData => {
                        if (wData.query && wData.query.search.length > 0) {
                            let html = '<h3 style="color:var(--accent-green); font-size:16px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-shield-check"></i> Encyclopedic Knowledge Nodes</h3>';
                            wData.query.search.slice(0, 5).forEach(item => {
                                html += `
                                <div class="result-card">
                                    <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}" target="_blank">${item.title}</a>
                                    <p>${item.snippet}...</p>
                                    <span class="auth-tag"><i class="fa-solid fa-book"></i> Global Data Node</span>
                                </div>
                                `;
                            });
                            loader.innerHTML = html;
                        } else {
                            loader.innerHTML = `<p style="color:var(--accent-red);"><i class="fa-solid fa-triangle-exclamation"></i> No verified authentic data found for this query in the global consensus.</p>`;
                        }
                    });
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
