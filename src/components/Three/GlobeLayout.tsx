import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion-3d'
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
            // x = r * sin(theta) * cos(phi) ?? No, this is different convention.
            // Standard Fibonacci sphere:
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

    // Animation variants for the entire globe group
    const globeVariants = {
        active: {
            scale: 0.8,
            opacity: 0.1,
            z: -5, // Move back
            transition: { duration: 0.6, ease: 'easeInOut' }
        },
        idle: {
            scale: 1,
            opacity: 1,
            z: 0,
            transition: { duration: 0.6, ease: 'easeInOut' }
        }
    }

    // We need to use motion.group for the container
    // const GroupMotion = motion.group as any
    const GroupMotion = 'group' as any

    return (
        <group>
            {/* 
         The globe container. 
         When a project is active, we push this entire group back and fade it.
         BUT the active card is inside it? 
         
         Problem: If active card is inside, it will also fade out/scale down.
         Solution: The active card needs to be rendered OUTSIDE this group or ignore parent transforms (hard).
         
         Better Strategy:
         Render standard globe cards in this group.
         When active, the active card is NOT rendered here, but in a separate "Overlay" group at the root level?
         Or we keep it simple: 
         - All cards are here.
         - When active, non-active cards animate to transparent/back.
         - Active card animates to front.
      */}

            <GroupMotion
                ref={groupRef}
            // animate={activeIndex ? 'active' : 'idle'}
            // variants={globeVariants}
            >
                {projects.map((project, i) => {
                    const isSelected = activeIndex === project.id

                    // If selected, we might want to NOT render it here if we render it globally?
                    // No, let's keep it here but counter-act the parent animation? Impossible easily.

                    // Alternative: The globe only contains NON-ACTIVE cards?
                    // If isSelected, we render nothing here?

                    if (isSelected) return null // Render active card outside this group

                    // Base position from sphere
                    const spherePos = projectPositions[i]

                    return (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            position={spherePos.toArray() as [number, number, number]}
                            isActive={false} // Always false here
                            onClick={(id) => onProjectSelect(id)}
                        />
                    )
                })}
            </GroupMotion>

            {/* Render Active Card Separately outside the rotating/scaling globe */}
            {activeIndex && (() => {
                const activeProject = projects.find(p => p.id === activeIndex)
                if (!activeProject) return null

                // We need the original position to animate FROM?
                // This is the tricky part of layout transitions in R3F.
                // For now, let's just spawn it in center or animate from 0.
                // To make it smooth, we would need LayoutCamera or similar, or just accept a cut/fade.

                // Let's try to animate from its last known position? 
                // Implementation: The active card is ALWAYS rendered here?

                return (
                    <ProjectCard
                        key={activeProject.id}
                        project={activeProject}
                        position={[0, 0, 0]} // Start at center? No, this snaps.
                        isActive={true}
                        onClick={() => onProjectSelect(null)}
                    />
                )
            })()}
        </group>
    )
}
