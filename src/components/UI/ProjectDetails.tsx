import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../../types'
import './styles.css'

interface ProjectDetailsProps {
    project: Project | null
    onClose: () => void
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        className="project-card"
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    >
                        <div className="project-header">
                            <h1 className="project-title">{project.title}</h1>
                            <button onClick={onClose} className="close-button">
                                ×
                            </button>
                        </div>

                        <p className="project-description">{project.description}</p>

                        <div className="tech-stack">
                            <span className="tech-label">Technologies</span>
                            <div className="tags">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="actions">
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                View Live
                            </a>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                Source Code
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
