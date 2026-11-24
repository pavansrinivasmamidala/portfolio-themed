import { useEffect, type ReactNode } from 'react';
import Layout, { Container, PageHeader } from './components/Layout';
import { Link, useRoute } from './router';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Security from './pages/Security';
import CaseStudy from './pages/CaseStudy';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import { getMachine } from './data/machines';
import { getProject } from './data/projects';
import { PROFILE } from './data/profile';

function resolve(path: string): { title: string; page: ReactNode } {
  const [, section, slug] = path.split('/');
  switch (section) {
    case '':
      return { title: `${PROFILE.shortName} — Frontend Engineer`, page: <Home /> };
    case 'about':
      return { title: `About — ${PROFILE.shortName}`, page: <About /> };
    case 'work': {
      if (!slug) return { title: `Work — ${PROFILE.shortName}`, page: <Work /> };
      const project = getProject(slug);
      if (project) return { title: `${project.title} — ${PROFILE.shortName}`, page: <ProjectDetail project={project} /> };
      break;
    }
    case 'contact':
      return { title: `Contact — ${PROFILE.shortName}`, page: <Contact /> };
    case 'security': {
      if (!slug) return { title: `Side quests — ${PROFILE.shortName}`, page: <Security /> };
      const machine = getMachine(slug);
      if (machine) return { title: `${machine.name} write-up — ${PROFILE.shortName}`, page: <CaseStudy machine={machine} /> };
      break;
    }
  }
  return {
    title: `404 — ${PROFILE.shortName}`,
    page: (
      <Container>
        <PageHeader label="404" tone="lilac" title={<>Nothing <span className="scribble">here</span>.</>}>
          <span className="text-ink/80">That page wandered off. </span>
          <Link to="/" className="font-semibold text-ink underline underline-offset-4">Go home →</Link>
        </PageHeader>
      </Container>
    ),
  };
}

export default function App() {
  const path = useRoute();
  const { title, page } = resolve(path);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Layout path={path}>
      {/* CSS fade on route change. Keyed so each page replays it. */}
      <div key={path} className="page-in">
        {page}
      </div>
    </Layout>
  );
}
