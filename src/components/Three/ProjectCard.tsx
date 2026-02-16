import { useRef, useState, useMemo } from 'react'
import { Group, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard, useTexture, RoundedBox, useScroll } from '@react-three/drei'
import { easing } from 'maath'
import type { Project } from '../../types'

interface ProjectCardProps {
    project: Project
    position: Vector3
    onClick?: (id: string) => void
    onHover?: () => void
    onLeave?: () => void
}

function CardImage({ url }: { url: string }) {
    const texture = useTexture(url)
    return (
        <mesh position={[0, 0, 0]}>
            <planeGeometry args={[3.0, 2.1]} />
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    )
}

export function ProjectCard({ project, position, onClick, onHover, onLeave }: ProjectCardProps) {
    const groupRef = useRef<Group>(null)
    const [hovered, setHovered] = useState(false)

    // Random float parameters for "alive" feel
    const floatSpeed = useMemo(() => Math.random() * 0.5 + 0.5, [])
    const floatOffset = useMemo(() => Math.random() * Math.PI * 2, [])

    const scroll = useScroll()

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // 1. Calculate World Position to determine "Depth"
        const worldPos = new Vector3()
        groupRef.current.getWorldPosition(worldPos)

        // Dynamic "Zoom" logic:
        // As we scroll (t goes 0->1), we want distant items to appear larger
        const t = scroll.offset

        const dist = state.camera.position.distanceTo(worldPos)

        // Base scale calculation: "Closer = Bigger"
        // But when scrolling, we want the back cards to "catch up" in size

        // Base depth factor: Front ~ 1.3, Back ~ 0.7
        let depthScale = 1.6 - (dist / 50)

        // Scroll Boost: Make minimum scale larger as we scroll
        // Min scale: 0.8 -> 1.8 (Significantly larger behind cards)
        const minScale = 0.8 + (t * 1.0)

        depthScale = Math.max(minScale, depthScale)

        // 2. Add Floating Animation
        const time = state.clock.elapsedTime
        const floatY = Math.sin(time * floatSpeed + floatOffset) * 0.2

        // 3. Apply Position
        groupRef.current.position.set(position.x, position.y + floatY, position.z)

        // 4. Smoothly Apply Scale
        const targetScale = hovered ? 1.3 : depthScale
        easing.damp3(groupRef.current.scale, [targetScale, targetScale, targetScale], 0.2, delta)
    })

    return (
        <group
            ref={groupRef}
            onClick={(e) => {
                e.stopPropagation()
                onClick?.(project.id)
            }}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
                onHover?.()
                document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
                setHovered(false)
                onLeave?.()
                document.body.style.cursor = 'auto'
            }}
        >
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                {/* 1. Main Card Container: Light Grey #D9D9D9 - FLAT */}
                <RoundedBox args={[3.5, 3.8, 0.1]} radius={0.2} smoothness={4}>
                    <meshBasicMaterial color="#D9D9D9" />
                </RoundedBox>

                {/* 2. Image Container: White #FFFFFF */}
                {/* Positioned slightly up to leave room for text at bottom */}
                <mesh position={[0, 0.4, 0.06]}>
                    <planeGeometry args={[3.1, 2.2]} />
                    <meshBasicMaterial color="#FFFFFF" />
                </mesh>

                {/* 3. The Image Itself */}
                {/* Rendered slightly in front of the white box */}
                <group position={[0, 0.4, 0.07]}>
                    <CardImage url={project.thumbnail} />
                </group>

                {/* 4. Project Name: Left Aligned at Bottom */}
                <Text
                    position={[-1.4, -1.2, 0.07]}
                    fontSize={0.25}
                    color="black"
                    anchorX="left"
                    anchorY="middle"
                    maxWidth={3.0}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    fontWeight={600}
                >
                    {project.title}
                </Text>
            </Billboard>
        </group>
    )
}
