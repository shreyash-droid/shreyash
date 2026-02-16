import { Image, Billboard } from '@react-three/drei'

export function HeroCard() {
    return (
        <group position={[0, 0, 0]}>
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <Image
                    url="/hero.png"
                    scale={[13.0, 8.4]} // Considerably larger start size
                    transparent
                    opacity={1}
                />
            </Billboard>
        </group>
    )
}
