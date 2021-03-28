function Header() {
  const letters = [
    "C",
    "O",
    "D",
    "E",
    " ",
    "A",
    "N",
    "A",
    "G",
    "R",
    "A",
    "M",
    "S",
  ];

  return (
    <header>
      <div>
        {letters.map((c, i) => {
          const style = { animationDelay: 0.5 + i / 10 + "s" };

          return (
            <span
              aria-hidden="true"
              key={i}
              style={style}
              className="animate-letter heading-primary"
            >
              {c}
            </span>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
