import "./characterSelect.css";
const CHARACTERS = [
  {
    id: "stan",
    name: "Stan",
    description:
      "A small yet mighty adventurer who doesn't back down from a fight, however his aim when catching prey could use some work.",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526381949013196920/37210721-F4C9-4BC3-AF43-253F7D6E7D1E.png?ex=6a5f6337&is=6a5e11b7&hm=6d7d4a3f49ff18321b1a3bd78702859638394330f69f4ffd91f775dc716867d7&",
  },
  {
    id: "athena",
    name: "Athena",
    description:
      "A fur missile with limitless energy, a sharp mind, and a knack for finding trouble, she wont stop until she completes whatever task is set before her.",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526952398076252212/05D812C0-54F9-4056-8032-12EF1AE73DAF.png?ex=6a5f7c3d&is=6a5e2abd&hm=9b0df04a639f407ae86cde107b0ab644a0d0283baa7a18bc74121acf64f34afd&",
  },
  {
    id: "tray",
    name: "Tray",
    description:
      "A loyal, intelligent and protective companion with playful spirit. Always ready for the next adventure.",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526952446759534797/295A859A-F2E7-4DC2-89C6-6774B57F5151.png?ex=6a5f7c48&is=6a5e2ac8&hm=73920d11f43ce07e36fc733846f8817120ed3945bf1dd4459822f1f1a0b3c71e&",
  },
  {
    id: "opie",
    name: "Opie",
    description:
      "As affectionate as he is clever, this tuxedo balances a brilliant and calculating mind with a deeply loving heart. Always figuring out the smartest way to handle trouble, but just as quick to cuddle up when the dust settles!",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1524943777134018631/Ajax_asset.png?ex=6a5f6dd0&is=6a5e1c50&hm=6f8a5e895931d7c2111837416c38008a9068bded8c5cd3f1ef637295a155ae1c&",
  },
  {
    id: "ajax",
    name: "Ajax",
    description:
      "A wild little spitfire with boundless energy. He's a little stinker, but he'll steal your heart!",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526381991862472704/1225AD3D-7550-4EEE-8ADC-866AE00EF7DC.png?ex=6a5f6341&is=6a5e11c1&hm=72245e0a08849918059906f4535582055b0adda21bfd796995328a68d9162d05&",
  },
  {
    id: "lincoln",
    name: "Lincoln",
    description:
      "A total wildcard, Lincoln excels at making a class about web development feel fresh and exciting with every appearance.",
    image:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526952485372297356/40BE80B3-A41C-4037-A49E-D9EF16D71EFE.png?ex=6a5f7c51&is=6a5e2ad1&hm=170aba4686229d0188c09fe989a88b691f04dde238c0516a44ed52c141de5218&",
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
