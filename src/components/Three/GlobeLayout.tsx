import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3, MathUtils } from 'three'
import { ProjectCard } from './ProjectCard'
import { projects } from '../../data/projects'


interface GlobeLayoutProps {
    radius?: number
    activeIndex?: string | null
    onProjectSelect: (id: string | null) => void
    autoRotate?: boolean
}

export function GlobeLayout({ radius = 10, activeIndex, onProjectSelect, autoRotate = true }: GlobeLayoutProps) {
    const groupRef = useRef<Group>(null)

    // Calculate spherical positions
    const projectPositions = useMemo(() => {
        const phi = Math.PI * (3 - Math.sqrt(5))
        return projects.map((_, i) => {
            const y = 1 - (i / (projects.length - 1)) * 2
            const radiusAtY = Math.sqrt(1 - y * y)
            const theta = phi * i

            // Convert spherical to cartesian
            const x = Math.cos(theta) * radiusAtY
            const z = Math.sin(theta) * radiusAtY

            return new Vector3(x, y, z).multiplyScalar(radius)
        })
    }, [radius])

    // Mouse interaction for rotation (parallax)
    useFrame((state) => {
        if (!groupRef.current || activeIndex || !autoRotate) return // Stop rotation when active or disabled

        const { pointer } = state
        const targetRotationX = pointer.y * 0.1
        const targetRotationY = pointer.x * 0.1

        groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1)
        groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1)
    })

    // Mask the group motion for now as we aren't using framer-motion-3d here directly anymore
    const GroupMotion = 'group' as any

    return (
        <group>
            <GroupMotion
                ref={groupRef}
            >
                {projects.map((project, i) => {
                    const isSelected = activeIndex === project.id

                    if (isSelected) return null // Render active card outside this group

                    // Base position from sphere
                    const spherePos = projectPositions[i]

                    return (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            position={new Vector3(...spherePos.toArray())}
                            onClick={(id) => onProjectSelect(id)}
                        />
                    )
                })}
            </GroupMotion>

            {/* Render Active Card Separately outside the rotating/scaling globe */}
            {activeIndex && (() => {
                const activeProject = projects.find(p => p.id === activeIndex)
                if (!activeProject) return null

                return (
                    <ProjectCard
                        key={activeProject.id}
                        project={activeProject}
                        position={new Vector3(0, 0, 0)}
                        onClick={() => onProjectSelect(null)}
                    />
                )
            })()}
        </group>
    )
}
