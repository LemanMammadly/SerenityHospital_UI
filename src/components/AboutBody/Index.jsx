import React, { useEffect } from "react";
import "./Index.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section>
      <div className="container-about"  data-aos="zoom-in-up">
        <h3>ABOUT Serenity DIAGNOSTIC CENTER</h3>
        <p>
          Viam sumi mo id erit objectioni mo de necessario crediderim imo terra
          vox alios aut lor quasi. Vim quaero aut videri pendam plures duo extat
          neque arcte re ad etiam ego infiniti reperero mutuatur formalem. Viam
          sumi mo id erit objectioni mo de necessario crediderim imo terra vox
          alios aut lor quasi. Vim quaero aut videri pendam plures duo extat
          neque arcte re ad etiam ego infiniti reperero mutuatur formalem. Viam
          sumi mo id erit objectioni mo de necessario crediderim imo terra vox
          alios aut lor quasi. Vim quaero aut videri pendam plures duo extat
          neque arcte re ad etiam ego infiniti reperero mutuatur formalem.
        </p>
        <br />
        <p>
          Viam sumi mo id erit objectioni mo de necessario crediderim imo terra
          vox alios aut lor quasi. Vim quaero aut videri pendam plures duo extat
          neque arcte re ad etiam ego infiniti reperero mutuatur formalem. Viam
          sumi mo id erit objectioni mo de necessario crediderim imo terra vox
          alios aut lor quasi. Vim quaero aut videri pendam plures duo extat
          neque arcte re ad etiam ego infiniti reperero mutuatur formalem. Viam
          sumi mo id erit objectioni mo de necessario crediderim imo terra vox
          alios aut lor quasi. Vim quaero aut videri pendam plures duo extat
          neque arcte re ad etiam ego infiniti reperero mutuatur formalem.
        </p>
      </div>
    </section>
  );
};

export default Index;
