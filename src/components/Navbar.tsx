'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useStore } from '@/lib/store';

const navigation = [
  { name: 'Home', href: '/' },
  { name: "Men's", href: '/category/men' },
  { name: "Women's", href: '/category/women' },
  { name: "Kids'", href: '/category/kids' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, wishlist, getCartItemsCount } = useStore();
  const cartItemsCount = getCartItemsCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-primary-600">StyleHub</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors hover:text-primary-600 ${
                pathname === item.href ? 'text-primary-600' : 'text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
            <HeartIcon className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
            <ShoppingBagIcon className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
      
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-primary-600">StyleHub</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span>Wishlist ({wishlist.length})</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 text-gray-700 hover:text-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      <span>Cart ({cartItemsCount})</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition.Root>
    </header>
  );
}