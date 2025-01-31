import React, { useState } from "react";
import { Github, PlayCircle, Mail, Twitter, X } from "lucide-react";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("persönlich");

  const personalProjects = [
    {
      title: "The Behold Game",
      image: "public/behold-game-icon.png",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.webecomewhat.unofficial.game",
      description: "Ein erfolgreiches WebView-basiertes Android-Spiel mit über 1 Million Downloads",
      technologies: ["WebView", "Java", "JavaScript", "HTML5", "Android Studio"],
      codeExamples: [
        {
          title: "Mehrsprachige Unterstützung - Android",
          language: "java",
          code: `// Get system language and load appropriate game version
String language = Locale.getDefault().getLanguage();
String filePath = "file:///android_asset/game_data/index.html?lang=" + language;
gameView.loadUrl(filePath);`
        },
        {
          title: "Mehrsprachige Unterstützung - JavaScript",
          language: "javascript",
          code: `// Extract language parameter from URL
function getParameterByName(name) {
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null ? "" : 
           decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Load appropriate language strings
const language = getParameterByName('lang') || 'en';
loadLanguageStrings(language);`
        }
      ],
      achievements: [
        "Über 1 Million Downloads mit 4.3 Sternen (10.000+ Bewertungen)",
        "20.000 monatlich aktive Nutzer",
        "12 Major Updates seit Launch (Oct 2022 - Aug 2024)",
        "Erfolgreiche Implementierung von DSGVO-konformen Werbesystemen",
        "Optimierte Benutzerinteraktion durch native Android-Integration"
      ]
    },
    {
      title: "Cute Dolls Game",
      image: "public/cutedolls/mirabel.png",
      playStoreUrl: "https://play.google.com/store/apps/developer?id=Cute+Dolls+Game",
      description: "Eine erfolgreiche Kollektion von Casual Games, fokussiert auf Dress-Up und Simulation Spiele mit WebView Technologie",
      technologies: ["WebView", "Java", "HTML5", "Multiple Ad Networks"],
      achievements: [
        "Zwei Spiele mit über 100.000+ Downloads",
        "Mehrere Spiele mit 50.000+ Downloads",
        "Erfolgreiche Integration multipler Ad-Netzwerke (IronSource, AppLovin, Unity Ads, Meta Ads, Pangle)",
        "Optimierte WebView-Performance für verschiedene Android-Versionen",
        "Effektive Monetarisierungsstrategie durch diverse Werbenetzwerke"
      ],
      publishedGames: [
        {
          title: "Lady-Bug Dress-Up: Girl Games",
          category: "Simulation",
          installs: "100,000+",
          icon: "public/cutedolls/ladybug3.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.ladybugmira.dressup.superhero.girl"
        },
        {
          title: "Lady-Bug Dress-Up & Fashion",
          category: "Simulation",
          installs: "100,000+",
          icon: "public/cutedolls/ladybug1.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.ladybugmira.dressup"
        },
        {
          title: "Lady-Bug Dress-Up & Fashion 2",
          category: "Simulation",
          installs: "50,000+",
          icon: "public/cutedolls/ladybug2.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.ladybugmira.dressup.superhero"
        },
        {
          title: "Mirabel Dressup: Encanto Games",
          category: "Role Playing",
          installs: "50,000+",
          icon: "public/cutedolls/mirabel.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.mirabelencanto.dressupgames"
        }
        ,
        {
          title: "Pony Princess Makeover & Dress",
          category: "Simulation",
          installs: "10,000+",
          icon: "public/cutedolls/pony.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.pony.dressup.rainbowdash"
        },
        {
          title: "Burger Shop: Madness Cooking",
          category: "Simulation",
          installs: "1,000+",
          icon: "public/cutedolls/burger.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.brugergame.madnesscooking"
        },
        {
          title: "Easter Makeup For Princesses",
          category: "Role Playing",
          installs: "1,000+",
          icon: "public/cutedolls/easter.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.eastermakeup.girlsgame"
        },
        {
          title: "Ice Princess Halloween Costume",
          category: "Simulation",
          installs: "5,000+",
          icon: "public/cutedolls/ice.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.ice.princess.halloween.costume.dressup"
        }
      ]
    },
    {
      title: "Christmas Spirit Studios",
      image: "public/christmas/santaicon.png",
      playStoreUrl: "https://play.google.com/store/apps/dev?id=6803960368106361037",
      description: "Eine vielfältige Kollektion von Weihnachtsspielen, entwickelt mit verschiedenen Technologien",
      technologies: ["WebView", "Unity 3D", "Java Game", "HTML5", "Android Studio", "Unity Ads"],
      achievements: [
        "Portfolio von 12 aktiven Spielen mit verschiedenen Kategorien",
        "Entwicklung eines lokalen Server-Systems mit NanoHTTPD für optimale WebView-Performance",
        "Zwei erfolgreiche Unity 3D Spiele entwickelt",
        "Ein Spiel mit LibGDX/Java implementiert und optimiert",
        "Top-Spiele erreichen 10.000+ Downloads",
        "Verschiedene Genres: Musik, Casual, Racing, Puzzle",
        "Effiziente Monetarisierung durch strategische Werbeplatzierung"
      ],
      publishedGames: [
        {
          title: "Christmas Magic Piano Tiles",
          category: "Music & Audio",
          installs: "10,000+",
          icon: "public/christmas/piano.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.magic.tiles.christmas"
        },
        {
          title: "Santa Video Call Simulator",
          category: "Entertainment",
          installs: "10,000+",
          icon: "public/christmas/santa1.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.call.santa.christmas.games"
        },
        {
          title: "Christmas Nail Salon Art",
          category: "Casual",
          installs: "10,000+",
          icon: "public/christmas/nail.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.christmas.nailart.salon"
        },
        {
          title: "Christmas Match 3: Candy Game",
          category: "Casual",
          installs: "1,000+",
          icon: "public/christmas/match.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.christmas.candy.match3.crush"
        },
        {
          title: "Christmas Coloring: Santa Fun",
          category: "Casual",
          installs: "1,000+",
          icon: "public/christmas/coloring1.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.santas.festivecoloring"
        },
        {
          title: "Christmas Coloring Book Glow",
          category: "Art & Design",
          installs: "1,000+",
          icon: "public/christmas/coloring.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.glowxmas.santadraw"
        },
        {
          title: "Santa Call: Fake Video Chat",
          category: "Entertainment",
          installs: "1,000+",
          icon: "public/christmas/santaicon.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.santa.videocall.christmas"
        },
        {
          title: "Christmas Hill Climb Driving",
          category: "Racing",
          installs: "500+",
          icon: "public/christmas/hill.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.santaclausgame.snowyride"
        },
        {
          title: "Santa Simulator: Gift Drop",
          category: "Adventure",
          installs: "100+",
          icon: "public/christmas/simulator.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.santa.simulator.gift.drop"
        },
        {
          title: "Santa Rescue: Lava Puzzles",
          category: "Strategy",
          installs: "100+",
          icon: "public/christmas/rescue.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.santaescape.lavapuzzles"
        },
        {
          title: "Santa Ski: Christmas Game",
          category: "Adventure",
          installs: "100+",
          icon: "public/christmas/ski.png",
          playStoreUrl: "https://play.google.com/store/apps/details?id=com.christmas.santaski.downhillrush"
        }
      ]
    }
  ];

  const clientProjects = [
    {
      title: "Sort The Court: Royal Builder",
      period: "Feb 2023 - Present",
      image: "public/sort-court/icon.png", // App icon
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.royalarcadegames.sortthecourt",
      description: "Ein erfolgreiches Mobile-Port des beliebten PC-Spiels mit über 100.000 Installationen und einer durchschnittlichen Bewertung von 4,2 Sternen. Komplette Überarbeitung der Steuerung und WebView-Integration für optimale mobile Performance.",
      technologies: ["WebView", "Java", "JavaScript", "HTML5", "Android Studio"],
      achievements: [
        "Über 100.000 Installationen erreicht",
        "4.2 Sterne Durchschnittsbewertung (798 Bewertungen)",
        "Erfolgreiche Monetarisierung durch nicht-intrusive Werbung",
        "Komplette Überarbeitung der mobilen Steuerung"
      ],
      dropdowns: [
        {
          title: "Live Performance",
          content: {
            type: "image",
            src: "public/sort-court/metrics.png",
            alt: "Sort The Court Live Metriken Dashboard"
          }
        },
        {
          title: "Mobile WebView-Integration & Optimierungen",
          content: {
            type: "code",
            language: "java",
            code: `        // ===== KERNIMPLEMENTIERUNG =====
        // WebView-Konfiguration für Desktop-Emulation
        game.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        game.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK); // Offlinefähigkeit
        game.getSettings().setDomStorageEnabled(true); // HTML5-Speicherunterstützung
        game.getSettings().setAllowFileAccessFromFileURLs(true); // Lokale Asset-Integration
        
        // JavaScript-Android-Bridge für Spielsteuerung
        game.addJavascriptInterface(new WebAppInterface(this), "Android");
        
        // ===== MOBILE STEUERUNG =====
        // Dynamische Positionierung der Y/N-Tasten
        ViewTreeObserver yKeyObserver = yKey.getViewTreeObserver();
        yKeyObserver.addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                yKey.getViewTreeObserver().removeOnGlobalLayoutListener(this);
                originalYKeyX = yKey.getX(); // Ursprungsposition merken
                originalYKeyY = yKey.getY();
            }
        });
        
        ViewTreeObserver nKeyObserver = nKey.getViewTreeObserver();
        nKeyObserver.addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                nKey.getViewTreeObserver().removeOnGlobalLayoutListener(this);
                originalNKeyX = nKey.getX();
                originalNKeyY = nKey.getY();
            }
        });
        
        // Reset-Funktionalität für Tastenpositionen
        resetPosKey.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                yKey.setX(originalYKeyX); // Zurück zur Originalposition
                yKey.setY(originalYKeyY);
                nKey.setX(originalNKeyX);
                nKey.setY(originalNKeyY);
            }
        });
        
        // ===== FULLSCREEN-MANAGEMENT =====
        // Verzögerte Fullscreen-Aktivierung (nach 4s)
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                game.loadUrl("javascript:AndroidInterface.setFullscreen();");
            }
        }, 4000);
        
        // JavaScript-Integration für responsive Darstellung
        // (Original-Code aus index.html)
        var AndroidInterface = {
            setFullscreen: function() {
                SetFullscreen(1); // Android-Trigger
            }
        };
        
        function SetFullscreen(val) {
            if (val == 1) {
                document.body.classList.add('fullscreen');
                canvas.width = window.innerWidth;  // Dynamische Anpassung
                canvas.height = window.innerHeight;
            }
        }`
          }
        },
        {
          title: "Nutzer-Feedback & Updates",
          content: {
            type: "multiImage",
            images: [
              {
                src: "public/sort-court/review1.png",
                alt: "Positives Nutzerfeedback nach Update"
              },
              {
                src: "public/sort-court/review2.png",
                alt: "Feedback zur Steuerungsimplementierung"
              }
            ]
          }
        }
      ],
      contributions: [
        "WebView-Integration für optimale Performance",
        "Implementierung responsiver mobiler Steuerung",
        "Performance-Optimierung für ältere Geräte"
      ]
    },
    {
      title: "Fairytale Fashion House",
      image: "/api/placeholder/64/64",
      description: "Entwicklung von Ice Princess Dress-Up Spielen",
      technologies: ["WebView", "Java", "HTML5"],
      contributions: [
        "Entwicklung mehrerer Dress-Up Spiele",
        "WebView-Optimierung für bessere Performance",
        "Integration von Werbesystemen"
      ]
    },
    {
      title: "PixelPulse Studios",
      image: "/api/placeholder/64/64",
      description: "Wednesday-themed WebView Games",
      technologies: ["WebView", "Java", "HTML5"],
      contributions: [
        "Entwicklung thematischer Spiele",
        "WebView-Integration und Optimierung",
        "Performance-Tuning"
      ]
    },
    {
      title: "Fatiha Dev Games",
      image: "/api/placeholder/64/64",
      description: "Entwicklung von Kinder- und Autorennspiele",
      technologies: ["WebView", "Java", "HTML5"],
      contributions: [
        "2 Kinderspiele entwickelt",
        "2 Autorennspiele implementiert",
        "WebView-Optimierung für verschiedene Geräte"
      ]
    },
    {
      title: "Stickman Fun Factory",
      image: "/api/placeholder/64/64",
      description: "WebView-basierte Stickman-Spiele",
      technologies: ["WebView", "Java", "HTML5"],
      contributions: [
        "Entwicklung von 2 Stickman-Spielen",
        "WebView-Integration",
        "Performance-Optimierung"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Outmane Hassani</h1>
          <p className="text-xl text-gray-600 mt-2">Mobile Game Developer</p>
          
          <div className="flex gap-4 mt-4">
            <a 
              href="https://github.com/OutmaneAmazighi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://x.com/OutmanAmazighi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Twitter size={20} />
              <span>X /Twitter</span>
            </a>
            <a 
              href="mailto:outmane.azubi@gmail.com" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Mail size={20} />
              <span>Kontakt</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Über Mich</h2>
          <p className="text-gray-600">
            Als leidenschaftlicher Spieleentwickler mit fundierter Erfahrung in der Entwicklung und 
            Veröffentlichung von mobilen Spielen, spezialisiere ich mich auf Unity 3D und 
            Android-Entwicklung. Meine Expertise umfasst die Implementierung von 
            Monetarisierungsstrategien, WebView-Integration und Google Play Services.
          </p>
        </div>

        {/* Project Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("persönlich")}
            className={`px-4 py-2 rounded ${
              activeTab === "persönlich"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Persönliche Projekte
          </button>
          <button
            onClick={() => setActiveTab("kunden")}
            className={`px-4 py-2 rounded ${
              activeTab === "kunden"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Kundenprojekte
          </button>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {activeTab === "persönlich" ? (
            personalProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={project.image} 
                    alt={`${project.title} Icon`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      {project.playStoreUrl && (
                        <a 
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <PlayCircle size={20} />
                          <span>Play Store</span>
                        </a>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mt-2">{project.description}</p>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.codeExamples && (
                      <div className="mt-6">
                        <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer list-none">
                            <h4 className="font-semibold text-gray-900">Code Implementation</h4>
                            <div className="text-sm text-gray-500">
                              <span className="group-open:hidden">Zeigen ↓</span>
                              <span className="hidden group-open:inline">Verstecken ↑</span>
                            </div>
                          </summary>
                          
                          <div className="mt-4 space-y-4">
                            {project.codeExamples.map((example, index) => (
                              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                                  <span className="text-gray-200 font-medium">{example.title}</span>
                                  <span className="text-gray-400 text-sm">{example.language}</span>
                                </div>
                                <pre className="p-4 overflow-x-auto">
                                  <code className="text-gray-200 text-sm font-mono whitespace-pre">
                                    {example.code}
                                  </code>
                                </pre>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )}

                    {project.publishedGames && (
                      <div className="mt-6">
                        <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer list-none">
                            <h4 className="font-semibold text-gray-900">Veröffentlichte Spiele</h4>
                            <div className="text-sm text-gray-500">
                              <span className="group-open:hidden">Zeigen ↓</span>
                              <span className="hidden group-open:inline">Verstecken ↑</span>
                            </div>
                          </summary>
                          
                          <div className="mt-4 grid gap-4">
                            {project.publishedGames.map((game, gameIndex) => (
                              <div key={gameIndex} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <img 
                                  src={game.icon} 
                                  alt={game.title}
                                  className="w-12 h-12 rounded-lg"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-medium text-gray-900">{game.title}</h5>
                                    <span className="text-sm text-gray-500">{game.installs}</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-600">{game.category}</span>
                                    <a 
                                      href={game.playStoreUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                      <PlayCircle size={16} />
                                      <span>Play Store</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Erfolge:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {project.achievements.map((achievement, achieveIndex) => (
                          <li key={achieveIndex} className="text-gray-600">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            clientProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={project.image} 
                    alt={`${project.title} Icon`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                  <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                          {project.playStoreUrl && (
                            <a 
                              href={project.playStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                            >
                              <PlayCircle size={20} />
                              <span>Play Store</span>
                            </a>
                          )}
                        </div>
                        {project.period && (
                          <span className="text-gray-500">{project.period}</span>
                        )}
                      </div>
                    
                    <p className="text-gray-600 mt-2">{project.description}</p>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Add Dropdowns Here */}
                    {project.dropdowns && project.dropdowns.length > 0 && (
  <div className="mt-6 space-y-4">
    {project.dropdowns.map((dropdown, dropIndex) => (
      <details key={dropIndex} className="group">
        <summary className="flex justify-between items-center cursor-pointer list-none">
          <h4 className="font-semibold text-gray-900">{dropdown.title}</h4>
          <div className="text-sm text-gray-500">
            <span className="group-open:hidden">Zeigen ↓</span>
            <span className="hidden group-open:inline">Verstecken ↑</span>
          </div>
        </summary>
        
        <div className="mt-4">
          {/* Single Image Content */}
          {dropdown.content.type === "image" && (
            <img 
              src={dropdown.content.src}
              alt={dropdown.content.alt}
              className="rounded-lg w-full"
            />
          )}

          {/* Multiple Images Content */}
          {dropdown.content.type === "multiImage" && (
            <div className="space-y-4">
              {dropdown.content.images.map((image, imgIndex) => (
                <img 
                  key={imgIndex}
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg w-full"
                />
              ))}
            </div>
          )}

          {/* Code Content */}
          {dropdown.content.type === "code" && (
  <div className="bg-gray-900 rounded-lg overflow-hidden max-w-full">
    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
      <span className="text-gray-200 font-medium">Code Implementation</span>
      <span className="text-gray-400 text-sm">{dropdown.content.language}</span>
    </div>
    <pre className="p-4 overflow-x-auto w-full">
      <code className="text-gray-200 text-sm font-mono whitespace-pre-wrap break-words">
        {dropdown.content.code}
      </code>
    </pre>
  </div>
)}
        </div>
      </details>
    ))}
  </div>
)}
                    
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Beiträge:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {project.contributions.map((contribution, contribIndex) => (
                          <li key={contribIndex} className="text-gray-600">
                            {contribution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>


{/* Development Notice Banner */}
<div className="bg-yellow-50 border-t border-yellow-200">
  <div className="max-w-5xl mx-auto px-4 py-3">
    <p className="text-yellow-800 text-sm text-center">
      🚧 Diese Website befindet sich noch in der Entwicklung 🚧
    </p>
  </div>
</div>

{/* Footer */}
<footer className="bg-white border-t border-gray-200">
  <div className="max-w-5xl mx-auto px-4 py-6">
    <p className="text-center text-sm text-gray-600">
      © 2024 Outmane Hassani. Mit ❤️ erstellt mit Hilfe von Claude.
    </p>
  </div>
</footer>


    </div>
  );
};

export default Portfolio;