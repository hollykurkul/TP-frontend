import React from "react";

const CHARACTERS = [
  {
    id: "stan",
    name: "Stan",
    description:
      "A small yet mighty adventurer who doesn't back down from a fight, however his aim when catching prey could use some work.",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526381949013196920/37210721-F4C9-4BC3-AF43-253F7D6E7D1E.png?ex=6a56d177&is=6a557ff7&hm=85521e0d88811c791f494e63474dddd81cc23f32770dff2e06b9447f04aac5a5&",
  },
  {
    id: "athena",
    name: "Athena",
    description:
      "A fur missile with limitless energy, a sharp mind, and a knack for finding trouble, she wont stop until she completes whatever task is set before her.",
    image: null,
  },
  {
    id: "tray",
    name: "Tray",
    description:
      "A loyal, intelligent and protective companion with playful spirit. Always ready for the next adventure.",
    image: null,
  },
  {
    id: "opie",
    name: "Opie",
    description:
      "As affectionate as he is clever, this tuxedo balances a brilliant and calculating mind with a deeply loving heart. Always figuring out the smartest way to handle trouble, but just as quick to cuddle up when the dust settles!",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526381991862472704/1225AD3D-7550-4EEE-8ADC-866AE00EF7DC.png?ex=6a56d181&is=6a558001&hm=2f612373320718545e6d26325fe883574b1f20f6069d928fd2f4d937745053c2&",
  },
  {
    id: "ajax",
    name: "Ajax",
    description:
      "A wild little spitfire with boundless energy. He's a little stinker, but he'll steal your heart!",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1524943777134018631/Ajax_asset.png?ex=6a563350&is=6a54e1d0&hm=3aea7f3ee721fa01b27f6a6383e4dcc79a585a62c4deeefc3643f95e3ccd7a64&",
  },
  {
    id: "lincoln",
    name: "Lincoln",
    description:
      "A total wildcard, Lincoln excels at making a class about web development feel fresh and exciting with every appearance.",
    image: null,
  },
];

export default function CharacterSelect({ onSelectCharacter }) {
  return (
    <main className="character-page">
      <section className="title-section">
        <p className="eyebrow">New journey</p>
        <h1>Choose Your Companion</h1>
        <p className="subtitle">
          Each traveler begins with a different strength, story, and way through
          the wild.
        </p>
      </section>

      <section className="character-grid">
        {CHARACTERS.map((char) => (
          <article key={char.id} className="character-card">
            <div className="character-image">
              {char.image ? (
                <img src={char.image} alt={`${char.name} character portrait`} />
              ) : (
                <span>Image</span>
              )}
            </div>
            <h2>{char.name}</h2>
            <p>{char.description}</p>
            <button type="button" onClick={() => onSelectCharacter(char)}>
              Choose {char.name}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
