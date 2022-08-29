import p from "../package.json";

const Logo = () => (
  <div className="logo inline-block">
    <img width="22" src={`${p.homepage}/feed_glitch_logo.gif`} alt="logo" />
  </div>
)

export default Logo;