import { useMemo } from 'react'
import { Vector3 } from 'three'
import { projects } from '../../../data/projects'

export function useProjectRing() {
    return useMemo(() => {
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
}
