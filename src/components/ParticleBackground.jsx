function ParticleBackground() {
  return (
    <div className="css-particles">
      {Array.from({ length: 35 }).map((_, index) => (
        <span key={index} style={{ "--i": index }}></span>
      ))}
    </div>
  );
}

export default ParticleBackground;