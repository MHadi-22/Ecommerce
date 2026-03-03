import { useState, useEffect } from "react";
const fl = document.createElement("link");
fl.rel = "stylesheet";
fl.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap";
document.head.appendChild(fl);

// ── Design Colors ──
const T = {
  cream:   "#f5f0e8",
  cream2:  "#ede8dc",
  cream3:  "#e8e1d4",
  parchment: "#faf7f2",
  ink:     "#2c2416",
  inkMid:  "#5a4f3c",
  inkLight:"#9a8f7e",
  inkFaint:"#d4cfc6",
  teal:    "#2d5a4e",
  tealLight:"#3d7a68",
  rust:    "#b85c38",
  sand:    "#c8b99a",
  white:   "#ffffff",
};
const FD = "'Libre Baskerville', Georgia, serif";
const FB = "'Outfit', sans-serif";

// ── Products ──
const PRODUCTS = [
  { id:1, cat:"Shirts", name:"Orchard Shirt Cream", price:157.5, img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10", tag:"New Arrival" },
  { id:2, cat:"Bags",   name:"Camp Craft Tote",    price:95,    img:"https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop", tag:"Popular" },
  { id:3, cat:"Shirts", name:"Linen Overshirt",    price:134,   img:"https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop", tag:null },
  { id:4, cat:"Pants",  name:"Grand Tour Trousers",price:188,   img:"https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop", tag:"Bestseller" },
  { id:5, cat:"Jackets",name:"Junction Blazer",    price:295,   img:"https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop&crop=top", tag:"New Arrival" },
  { id:6, cat:"Shirts", name:"Cotton Herringbone", price:89,    img:"https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop", tag:null },
 { 
  id:7, cat:"Jackets",name:"Wool Field Coat", price:345,  img:"https://images.unsplash.com/photo-1548883354-94bcfe321cbb",tag:"Limited" },
  { id:8, cat:"Pants",  name:"Slim Chino Sand",    price:112,   img:"https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop", tag:null },
];

const CATS = ["All Pieces","Shirts","Jackets","Pants","Bags"];

function useHover() {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter:()=>setH(true), onMouseLeave:()=>setH(false) }];
}

function CartDrawer({ cart, onClose, onInc, onDec, onRemove }) {
  const total = cart.reduce((s,i)=>s+i.price*i.qty, 0);
  const qty   = cart.reduce((s,i)=>s+i.qty, 0);
  const [done, setDone] = useState(false);

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(44,36,22,0.35)", zIndex:998, backdropFilter:"blur(2px)" }} />
      <div style={{
        position:"fixed", top:0, right:0, bottom:0, width:"min(380px,100vw)",
        background:T.parchment, zIndex:999, display:"flex", flexDirection:"column",
        borderLeft:`1px solid ${T.inkFaint}`,
        boxShadow:"-16px 0 48px rgba(44,36,22,0.12)",
        animation:"slideCart 0.32s cubic-bezier(0.22,1,0.36,1)",
        fontFamily:FB,
      }}>
        <style>{`@keyframes slideCart{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        <div style={{ padding:"28px 28px 20px", borderBottom:`1px solid ${T.inkFaint}`, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <p style={{ margin:0, fontSize:"10px", color:T.inkLight, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"4px" }}>Your Selection</p>
            <h2 style={{ margin:0, fontSize:"22px", fontFamily:FD, color:T.ink, fontWeight:400 }}>Cart ({qty})</h2>
          </div>
          <button onClick={onClose} style={{ background:"none", border:`1px solid ${T.inkFaint}`, width:"34px", height:"34px", cursor:"pointer", fontSize:"16px", color:T.inkMid, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"2px" }}>✕</button>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"16px 28px" }}>
          {cart.length===0 ? (
            <div style={{ textAlign:"center", padding:"60px 0" }}>
              <p style={{ fontSize:"36px", marginBottom:"12px" }}>🛍</p>
              <p style={{ fontFamily:FD, fontSize:"18px", color:T.ink, margin:"0 0 6px" }}>Nothing here yet</p>
              <p style={{ fontSize:"13px", color:T.inkLight, fontWeight:300 }}>Add pieces to your selection</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display:"flex", gap:"14px", padding:"16px 0", borderBottom:`1px solid ${T.inkFaint}` }}>
              <img src={item.img} alt={item.name} style={{ width:"64px", height:"80px", objectFit:"cover", borderRadius:"2px" }} />
              <div style={{ flex:1 }}>
                <p style={{ margin:"0 0 4px", fontSize:"14px", fontFamily:FD, color:T.ink, fontWeight:400, lineHeight:1.3 }}>{item.name}</p>
                <p style={{ margin:"0 0 10px", fontSize:"13px", color:T.inkMid }}>${(item.price*item.qty).toFixed(2)}</p>
                <div style={{ display:"flex", alignItems:"center", gap:"0" }}>
                  {[{l:"−",f:()=>onDec(item.id)},{l:item.qty,f:null},{l:"+",f:()=>onInc(item.id)}].map((b,i)=>(
                    <button key={i} onClick={b.f} disabled={!b.f} style={{ width:"28px", height:"28px", border:`1px solid ${T.inkFaint}`, borderRight:i===0?"none":undefined, borderLeft:i===2?"none":undefined, background:b.f?T.cream:"transparent", color:b.f?T.ink:T.inkMid, cursor:b.f?"pointer":"default", fontSize:i===1?"13px":"15px", fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FB }}>{b.l}</button>
                  ))}
                </div>
              </div>
              <button onClick={()=>onRemove(item.id)} style={{ background:"none", border:"none", cursor:"pointer", color:T.inkLight, fontSize:"14px", alignSelf:"flex-start", padding:"2px" }}>✕</button>
            </div>
          ))}
        </div>

        {cart.length>0 && (
          <div style={{ padding:"20px 28px", borderTop:`1px solid ${T.inkFaint}`, background:T.cream }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
              <span style={{ fontSize:"12px", color:T.inkLight, letterSpacing:"0.5px" }}>Subtotal</span>
              <span style={{ fontSize:"13px", color:T.ink, fontWeight:500 }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"18px" }}>
              <span style={{ fontSize:"12px", color:T.inkLight }}>Shipping</span>
              <span style={{ fontSize:"13px", color:T.teal, fontWeight:500 }}>{total>150?"Complimentary":"$12.00"}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:"14px", borderTop:`1px solid ${T.inkFaint}`, marginBottom:"20px" }}>
              <span style={{ fontSize:"13px", color:T.ink, fontWeight:600, letterSpacing:"1px", textTransform:"uppercase" }}>Total</span>
              <span style={{ fontSize:"20px", fontFamily:FD, color:T.ink }}>${(total+(total>150?0:12)).toFixed(2)}</span>
            </div>
            {done ? (
              <div style={{ textAlign:"center", padding:"18px", background:T.cream2, border:`1px solid ${T.sand}`, borderRadius:"3px" }}>
                <p style={{ margin:0, fontFamily:FD, fontSize:"16px", color:T.teal }}>Order placed. Thank you.</p>
                <p style={{ margin:"4px 0 0", fontSize:"12px", color:T.inkLight }}>Confirmation sent to your email</p>
              </div>
            ) : (
              <button onClick={()=>setDone(true)} style={{ width:"100%", padding:"14px", background:T.teal, color:T.white, border:"none", cursor:"pointer", fontSize:"12px", letterSpacing:"2.5px", textTransform:"uppercase", fontFamily:FB, fontWeight:600, transition:"background 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.tealLight}
              onMouseLeave={e=>e.currentTarget.style.background=T.teal}
              >Proceed to Checkout →</button>
            )}
            {total<=150 && !done && <p style={{ textAlign:"center", fontSize:"11px", color:T.inkLight, margin:"10px 0 0" }}>Add ${(150-total).toFixed(2)} more for complimentary shipping</p>}
          </div>
        )}
      </div>
    </>
  );
}

// ── Product Card ──
function ProductCard({ p, onAdd, addedId }) {
  const [hov, hProps] = useHover();
  const [imgErr, setImgErr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const added = addedId===p.id;

  return (
    <div {...hProps} style={{ cursor:"pointer", fontFamily:FB }}>
      {/* Image container */}
      <div style={{ position:"relative", paddingBottom:"125%", overflow:"hidden", background:T.cream2, marginBottom:"14px" }}>
        {!loaded && !imgErr && <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg, ${T.cream2} 25%, ${T.cream3} 50%, ${T.cream2} 75%)`, backgroundSize:"200% 100%", animation:"shimmer 1.4s infinite" }} />}
        {!imgErr ? (
          <img src={p.img} alt={p.name}
            onLoad={()=>setLoaded(true)} onError={()=>{setImgErr(true);setLoaded(true);}}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:loaded?1:0, transition:"opacity 0.4s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)", transform:hov?"scale(1.04)":"scale(1)" }}
          />
        ) : (
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:T.cream2 }}>
            <span style={{ fontSize:"40px" }}>👔</span>
            <span style={{ fontSize:"10px", color:T.inkLight, letterSpacing:"2px", textTransform:"uppercase", marginTop:"8px" }}>{p.cat}</span>
          </div>
        )}

        {p.tag && (
          <span style={{ position:"absolute", top:"14px", left:"14px", background:T.white, color:T.ink, fontSize:"9px", fontWeight:600, padding:"4px 10px", letterSpacing:"1.5px", textTransform:"uppercase" }}>{p.tag}</span>
        )}
        <div style={{
          position:"absolute", inset:0,
          background:"rgba(44,36,22,0.08)",
          opacity:hov?1:0, transition:"opacity 0.3s",
          display:"flex", alignItems:"flex-end", justifyContent:"center",
          paddingBottom:"20px",
        }}>
          <button
            onClick={(e)=>{e.stopPropagation(); onAdd(p);}}
            style={{
              padding:"11px 32px",
              background: added ? T.teal : T.white,
              color: added ? T.white : T.ink,
              border:"none", cursor:"pointer",
              fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase",
              fontFamily:FB, fontWeight:600,
              transition:"all 0.2s",
              boxShadow:"0 4px 20px rgba(44,36,22,0.15)",
              transform: hov ? "translateY(0)" : "translateY(10px)",
              transition:"all 0.3s",
            }}
          >{added?"✓ Added":"Add to Cart"}</button>
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ margin:"0 0 3px", fontSize:"14px", fontFamily:FD, color:T.ink, fontWeight:400, lineHeight:1.3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</p>
          <p style={{ margin:0, fontSize:"11px", color:T.inkLight, letterSpacing:"1px", textTransform:"uppercase" }}>{p.cat}</p>
        </div>
        <p style={{ margin:0, fontSize:"15px", fontFamily:FD, color:T.ink, fontWeight:400, whiteSpace:"nowrap", flexShrink:0 }}>${p.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

// ── MAIN APP ──
export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [activeCat, setActiveCat] = useState("All Pieces");
  const [heroLoaded, setHeroLoaded] = useState(false);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i=>i.id===p.id);
      if (ex) return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);
      return [...prev, {...p, qty:1}];
    });
    setAddedId(p.id);
    setTimeout(()=>setAddedId(null), 1600);
  };
  const inc = id => setCart(p=>p.map(i=>i.id===id?{...i,qty:i.qty+1}:i));
  const dec = id => setCart(p=>{ const it=p.find(i=>i.id===id); return it.qty===1?p.filter(i=>i.id!==id):p.map(i=>i.id===id?{...i,qty:i.qty-1}:i); });
  const rem = id => setCart(p=>p.filter(i=>i.id!==id));
  const totalQty = cart.reduce((s,i)=>s+i.qty,0);

  const filtered = activeCat==="All Pieces" ? PRODUCTS : PRODUCTS.filter(p=>p.cat===activeCat);

  return (
    <div style={{ minHeight:"100vh", background:T.parchment, fontFamily:FB, color:T.ink }}>
      <style>{`
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${T.cream};}
        ::-webkit-scrollbar-thumb{background:${T.sand};border-radius:99px;}
        ::placeholder{color:${T.inkLight};}
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(250,247,242,0.97)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${T.inkFaint}`, padding:"0 48px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontSize:"18px" }}>⚓</span>
        </div>

        {/* Nav links */}
        <div style={{ display:"flex", gap:"36px", alignItems:"center" }}>
          {["Shop","Products","Lookbook","Collection"].map(l=>(
            <span key={l} style={{ fontSize:"13px", color:T.inkMid, cursor:"pointer", fontWeight:400, transition:"color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.color=T.ink}
            onMouseLeave={e=>e.currentTarget.style.color=T.inkMid}
            >{l}</span>
          ))}
        </div>

        {/* Right */}
        <div style={{ display:"flex", gap:"24px", alignItems:"center" }}>
          <span style={{ fontSize:"13px", color:T.inkMid, cursor:"pointer" }}>Search</span>
          <button onClick={()=>setCartOpen(true)} style={{ background:"none", border:"none", fontSize:"13px", color:T.inkMid, cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", fontFamily:FB }}>
            Cart {totalQty>0 && <span style={{ background:T.teal, color:T.white, borderRadius:"50%", width:"18px", height:"18px", fontSize:"10px", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{totalQty}</span>}
          </button>
          <span style={{ fontSize:"13px", color:T.inkMid, cursor:"pointer" }}>Log in</span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"88vh", background:T.cream }}>

        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 64px 80px 80px", animation:"fadeUp 0.7s ease both" }}>
          <p style={{ margin:"0 0 20px", fontSize:"10px", color:T.inkLight, letterSpacing:"4px", textTransform:"uppercase" }}>New Collection — 2025</p>
          <h1 style={{ margin:"0 0 24px", fontFamily:FD, fontSize:"clamp(36px,4.5vw,58px)", fontWeight:400, lineHeight:1.1, color:T.ink, letterSpacing:"-0.5px" }}>
            An Elegant<br />
            <em style={{ fontStyle:"italic", color:T.teal }}>Outfit</em> for Everyone
          </h1>
          <p style={{ margin:"0 0 40px", fontSize:"14px", color:T.inkMid, lineHeight:1.8, maxWidth:"380px", fontWeight:300 }}>
            We try our best to ship orders along with updated tracking information within 24 hrs of email confirmation. Order processing cut-off times are provided as guidelines only.
          </p>
          <div style={{ display:"flex", gap:"20px", alignItems:"center" }}>
            <button style={{ padding:"13px 36px", background:T.teal, color:T.white, border:"none", cursor:"pointer", fontSize:"11px", letterSpacing:"2.5px", textTransform:"uppercase", fontFamily:FB, fontWeight:600, transition:"background 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background=T.tealLight}
            onMouseLeave={e=>e.currentTarget.style.background=T.teal}
            >Shop Now →</button>
            <span style={{ fontSize:"13px", color:T.inkMid, cursor:"pointer", textDecoration:"underline", textUnderlineOffset:"3px" }}>View Lookbook</span>
          </div>

          <div style={{ display:"flex", gap:"40px", marginTop:"64px", paddingTop:"40px", borderTop:`1px solid ${T.inkFaint}` }}>
            {[{n:"2011",l:"Founded"},{n:"1000+",l:"Products"},{n:"99.9%",l:"Satisfied Customers"}].map(s=>(
              <div key={s.l}>
                <p style={{ margin:"0 0 4px", fontSize:"22px", fontFamily:FD, color:T.ink, fontWeight:400 }}>{s.n}</p>
                <p style={{ margin:0, fontSize:"11px", color:T.inkLight, letterSpacing:"1px" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div style={{ position:"relative", overflow:"hidden", background:T.cream2 }}>
          {!heroLoaded && <div style={{ position:"absolute", inset:0, background:T.cream2 }} />}
          <img
            src="https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop"
            alt="Hero"
            onLoad={()=>setHeroLoaded(true)}
            style={{ width:"100%", height:"100%", objectFit:"cover", opacity:heroLoaded?1:0, transition:"opacity 0.6s" }}
          />
         
          {/* Scroll indicator */}
          <div style={{ position:"absolute", top:"50%", right:"28px", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:"8px", alignItems:"center" }}>
            {[1,2,3].map((d,i)=>(
              <div key={d} style={{ width:"6px", height:i===0?"22px":"6px", background: i===0?T.teal:T.sand, borderRadius:"99px" }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── ANNOUNCEMENT BANNER ── */}
      <div style={{ background:T.teal, padding:"14px 48px", display:"flex", justifyContent:"center", gap:"48px", flexWrap:"wrap" }}>
        {["Free shipping on orders over $150","Easy 30-day returns","Sustainably made in Portugal"].map(t=>(
          <span key={t} style={{ fontSize:"11px", color:"rgba(255,255,255,0.85)", letterSpacing:"1.5px", display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ color:"rgba(255,255,255,0.5)" }}>✦</span> {t}
          </span>
        ))}
      </div>

  
      <section style={{ padding:"80px 80px 90px" }}>
        {/* Section header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px" }}>
          <div>
            <p style={{ margin:"0 0 8px", fontSize:"10px", color:T.inkLight, letterSpacing:"4px", textTransform:"uppercase" }}>Handpicked for you</p>
            <h2 style={{ margin:0, fontFamily:FD, fontSize:"clamp(26px,3vw,38px)", fontWeight:400, color:T.ink, letterSpacing:"-0.3px" }}>Popular Products</h2>
          </div>
          <div style={{ display:"flex", gap:"0", borderBottom:`1px solid ${T.inkFaint}` }}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setActiveCat(c)} style={{
                padding:"10px 20px", border:"none",
                borderBottom:`2px solid ${activeCat===c?T.teal:"transparent"}`,
                background:"transparent",
                color:activeCat===c?T.teal:T.inkMid,
                fontSize:"12px", cursor:"pointer",
                letterSpacing:"0.5px", fontFamily:FB,
                fontWeight: activeCat===c?600:400,
                transition:"all 0.15s",
                marginBottom:"-1px",
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px,1fr))", gap:"32px 24px" }}>
          {filtered.map((p,i)=>(
            <div key={p.id} style={{ animation:`fadeUp 0.5s ease ${i*0.08}s both` }}>
              <ProductCard p={p} onAdd={addToCart} addedId={addedId} />
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:"56px" }}>
          <button style={{ padding:"13px 48px", background:"transparent", color:T.ink, border:`1px solid ${T.ink}`, cursor:"pointer", fontSize:"11px", letterSpacing:"2.5px", textTransform:"uppercase", fontFamily:FB, fontWeight:500, transition:"all 0.2s" }}
          onMouseEnter={e=>{e.currentTarget.style.background=T.ink;e.currentTarget.style.color=T.white;}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.ink;}}
          >View All Pieces →</button>
        </div>
      </section>

      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"480px", margin:"0 80px 80px", overflow:"hidden" }}>
        <div style={{ background:T.cream2, overflow:"hidden", position:"relative" }}>
          <img src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop" alt="Lookbook" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s", display:"block" }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          />
        </div>
        <div style={{ background:T.cream, display:"flex", flexDirection:"column", justifyContent:"center", padding:"64px 56px" }}>
          <p style={{ margin:"0 0 12px", fontSize:"10px", color:T.inkLight, letterSpacing:"4px", textTransform:"uppercase" }}>August 2025</p>
          <h2 style={{ margin:"0 0 20px", fontFamily:FD, fontSize:"clamp(22px,3vw,34px)", fontWeight:400, color:T.ink, lineHeight:1.2 }}>
            Best Lookbook<br />Of This Season
          </h2>
          <p style={{ margin:"0 0 32px", fontSize:"14px", color:T.inkMid, lineHeight:1.8, fontWeight:300, maxWidth:"340px" }}>
            A lookbook is a collection of photographs compiled to show off a model's photographic style, skills, or clothing. Totally Dapper at Dapper will Sustainable looks to let clients see the latest fashion.
          </p>
          <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"12px", color:T.teal, textDecoration:"none", fontWeight:600, letterSpacing:"1px" }}>
            Visit Lookbook <span style={{ fontSize:"16px" }}>↗</span>
          </a>
        </div>
      </section>

      <section style={{ background:T.cream2, padding:"72px 80px", margin:"0 0 0 0" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>
          <div>
            <p style={{ margin:"0 0 12px", fontSize:"10px", color:T.inkLight, letterSpacing:"4px", textTransform:"uppercase" }}>Why Choose Us</p>
            <h2 style={{ margin:"0 0 20px", fontFamily:FD, fontSize:"28px", fontWeight:400, color:T.ink, lineHeight:1.3 }}>
              Trusted & Verified<br />by Our Customers
            </h2>
            <p style={{ margin:"0 0 28px", fontSize:"14px", color:T.inkMid, lineHeight:1.8, fontWeight:300 }}>
              An amazing online shopping website. Very first time this Real product site let me change my order or website. I prefer this website to any other shopping website.
            </p>
            <div style={{ display:"flex", gap:"4px", marginBottom:"10px" }}>
              {[1,2,3,4,5].map(s=><span key={s} style={{ color:"#c9a84c", fontSize:"16px" }}>★</span>)}
            </div>
            <p style={{ margin:0, fontSize:"13px", fontFamily:FD, color:T.ink }}>Lydia Alexander</p>
            <p style={{ margin:"2px 0 0", fontSize:"11px", color:T.inkLight }}>Fashion Designer, Paris</p>
          </div>
          <div style={{ position:"relative" }}>
            <img src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop" alt="Customer" style={{ width:"100%", height:"360px", objectFit:"cover", objectPosition:"top" }} />
            <div style={{ position:"absolute", bottom:"-20px", right:"-20px", width:"120px", height:"120px", border:`6px solid ${T.parchment}`, overflow:"hidden" }}>
              <img src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:T.ink, padding:"72px 80px", textAlign:"center" }}>
        <p style={{ margin:"0 0 10px", fontSize:"10px", color:T.sand, letterSpacing:"4px", textTransform:"uppercase" }}>Stay in the loop</p>
        <h2 style={{ margin:"0 0 14px", fontFamily:FD, fontSize:"32px", fontWeight:400, color:T.white, lineHeight:1.2 }}>
          Subscribe to Our Newsletter
        </h2>
        <p style={{ margin:"0 0 36px", fontSize:"14px", color:"rgba(255,255,255,0.5)", fontWeight:300 }}>
          New arrivals, exclusive offers, and styling tips — direct to your inbox.
        </p>
        <div style={{ maxWidth:"440px", margin:"0 auto", display:"flex", gap:"0" }}>
          <input type="email" placeholder="Your email address" style={{ flex:1, padding:"14px 20px", border:`1px solid rgba(255,255,255,0.15)`, background:"rgba(255,255,255,0.07)", color:T.white, fontSize:"13px", outline:"none", fontFamily:FB }}
          onFocus={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.4)"}
          onBlur={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"}
          />
          <button style={{ padding:"14px 28px", background:T.teal, color:T.white, border:"none", cursor:"pointer", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", fontFamily:FB, fontWeight:600, whiteSpace:"nowrap" }}>Subscribe</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:T.cream, borderTop:`1px solid ${T.inkFaint}`, padding:"40px 80px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <span style={{ fontSize:"16px" }}>⚓</span>
        </div>
        <p style={{ margin:0, fontSize:"11px", color:T.inkLight, letterSpacing:"1px" }}>
          © 2025. 
        </p>
        <div style={{ display:"flex", gap:"24px" }}>
          {["Privacy","Terms","Contact"].map(l=>(
            <span key={l} style={{ fontSize:"11px", color:T.inkMid, cursor:"pointer", letterSpacing:"0.5px" }}>{l}</span>
          ))}
        </div>
      </footer>

    
      {cartOpen && <CartDrawer cart={cart} onClose={()=>setCartOpen(false)} onInc={inc} onDec={dec} onRemove={rem} />}
    </div>
  );
}
