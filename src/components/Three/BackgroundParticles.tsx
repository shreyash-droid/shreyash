import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial, useScroll } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export function BackgroundParticles() {
    const ref = useRef<any>()
    const scroll = useScroll()

    // Generate 400 positions in a sphere of radius 60
    const sphere = useMemo(() => random.inSphere(new Float32Array(400 * 3), { radius: 60 }), [])

    useFrame((state, delta) => {
        if (!ref.current) return

        // 1. Constant slow drift
        ref.current.rotation.x -= delta / 150
        ref.current.rotation.y -= delta / 200

        // 2. Scroll-based Parallax
        // Move particles UP as we scroll DOWN (creating depth)
        const t = scroll.offset // 0 to 1
        ref.current.position.y = t * 15 // Move up by 15 units over the scroll
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#E0B0FF" // Light Mauve/Purple
                    size={0.15}     // ~1.5px
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    )
}
