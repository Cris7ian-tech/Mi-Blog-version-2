// pages/HooksPage.tsx
import CardArticle from '../componentes/ui/CardArticle';
import hooksData from '../data/hooksData.json';

const HooksPage = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="p-4 sm:p-8">
      <h1 className={`text-3xl font-bold text-center mb-10 ${isDark ? 'text-[#61dafb]' : 'text-blue-600'}`}>
        Aprendiendo React Hooks 🪝
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hooksData.HooksData.map((hook, index) => (
          <CardArticle 
            key={index}
            {...hook}
          />
        ))}
      </div>
    </div>
  );
};

export default HooksPage;