import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import { easing } from 'maath'
import { useScroll, ScrollControls } from '@react-three/drei'
import { ProjectCard } from './ProjectCard'
import { HeroCard } from './HeroCard'
import { BackgroundParticles } from './BackgroundParticles'
import { projects } from '../../data/projects'

interface PortfolioSceneProps {
    onProjectSelect: (id: string | null) => void
}

function SceneContent({ onProjectSelect }: PortfolioSceneProps) {
    const orbitGroupRef = useRef<Group>(null)
    const heroRef = useRef<Group>(null)
    const scroll = useScroll()
    const [isHovered, setIsHovered] = useState(false)

    // Smooth speed transitions
    const speedRef = useRef(0.05)

    // Calculate Elliptical Ring Positions
    const positions = useMemo(() => {
        const count = projects.length
        const xRadius = 22
        const zRadius = 10

        return projects.map((_, i) => {
            const theta = (i / count) * Math.PI * 2

            const x = Math.cos(theta) * xRadius
            const z = Math.sin(theta) * zRadius

            const verticalOffset = 4.5
            const isUp = i % 2 === 0
            const y = (isUp ? 1 : -1) * (verticalOffset + Math.random() * 2)

            return new Vector3(x, y, z)
        })
    }, [])

    useFrame((_state, delta) => {
        const t = scroll.offset // 0 = Start, 1 = End

        // 1. Orbit Rotation
        if (orbitGroupRef.current) {
            const targetSpeed = isHovered ? 0 : 0.05
            easing.damp(speedRef, 'current', targetSpeed, 0.5, delta)
            orbitGroupRef.current.rotation.y += speedRef.current * delta

            // 2. ORBIT EXPANSION (Fly Out) - Reduced Expansion (Screen ref)
            easing.damp3(orbitGroupRef.current.scale, [1 + t * 1.5, 1 + t * 1.5, 1 + t * 1.5], 0.2, delta)
        }

        // 3. ZOOM EFFECT (Move objects)
        if (heroRef.current) {
            // Move Hero closer to camera - Increased to 8 to allow it to get bigger at end
            const targetZ = t * 8
            easing.damp(heroRef.current.position, 'z', targetZ, 0.2, delta)
        }
    })

    return (
        <group>
            {/* Ambient Particles (Restored & Tuned) */}
            <BackgroundParticles />

            {/* Center Hero Card */}
            <group ref={heroRef}>
                <HeroCard />
            </group>

            {/* Orbiting Projects Ring */}
            <group ref={orbitGroupRef}>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        position={positions[i]}
                        onHover={() => setIsHovered(true)}
                        onLeave={() => setIsHovered(false)}
                        onClick={(id) => onProjectSelect(id)}
                    />
                ))}
            </group>
        </group>
    )
}

export function PortfolioScene(props: PortfolioSceneProps) {
    return (
        <ScrollControls pages={1.6} damping={0.2}>
            <SceneContent {...props} />
        </ScrollControls>
    )
}
