import { useTheme } from '../../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;