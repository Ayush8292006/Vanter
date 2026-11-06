import React from 'react';
import { JOURNAL_ARTICLES, INSTAGRAM_POSTS } from '../data/products';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { VMonogram } from '../components/brand/VMonogram';
import { JournalArticle } from '../types';

export const JournalSection: React.FC = () => {
  return (
    <section id="journal" className="bg-ivory text-charcoal py-24 sm:py-36 px-6 lg:px-12 border-b border-sand overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-semibold block mb-3">
              — 08 / THE GAZETTE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-light leading-tight">
              Olfactive <span className="italic font-normal text-gold">Journal</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-taupe mt-2">
              Essays on botanical sourcing, layering rituals, and French perfumery philosophy.
            </p>
          </div>

          <a
            href="#journal"
            className="text-xs uppercase tracking-[0.25em] text-black hover:text-gold font-sans font-medium transition-colors inline-flex items-center gap-2 group self-start md:self-auto"
          >
            <span>All Chronicles</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {JOURNAL_ARTICLES.map((article: JournalArticle) => (
            <article
              key={article.id}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-beige overflow-hidden border border-sand mb-5">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-ivory text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] uppercase font-sans tracking-[0.25em] text-taupe mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl text-black group-hover:text-gold transition-colors duration-300 leading-snug">
                  {article.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-taupe mt-2.5 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand/50 flex items-center gap-1.5 text-xs uppercase font-sans tracking-[0.2em] text-black group-hover:text-gold transition-colors">
                <span>Read Essay</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        <div className="pt-12 border-t border-sand flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Instagram size={18} className="text-gold" />
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-black font-medium">
              @MAISON.VANTER
            </span>
          </div>
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-taupe">
            Grasse & Paris Moments
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square bg-beige overflow-hidden border border-sand group cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center p-3 text-center">
                <VMonogram size={24} className="mb-2" />
                <p className="text-[10px] text-ivory font-serif italic line-clamp-2">
                  "{post.caption}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
