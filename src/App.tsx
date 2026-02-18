import { Component, type ReactNode, useState, Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
// import { Environment } from '@react-three/drei'
// import { PortfolioScene } from './components/Three/PortfolioScene'
import { ProjectDetails } from './components/UI/ProjectDetails'
import { projects } from './data/projects'
import './App.css'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: string }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: '' }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.toString() }
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: 20 }}><h1>Something went wrong.</h1><pre>{this.state.error}</pre></div>
    }
    return this.props.children
  }
}

const PortfolioScene = lazy(() => import('./components/Three/PortfolioScene').then(module => ({ default: module.PortfolioScene })))

function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const activeProjectData = projects.find(p => p.id === activeProject) || null

  return (
    <div className="app-container">

      <ProjectDetails
        project={activeProjectData}
        onClose={() => setActiveProject(null)}
      />

      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            {/* <color attach="background" args={['#101010']} /> Removed for transparency */}
            <PortfolioScene onProjectSelect={setActiveProject} />

          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

export default App
