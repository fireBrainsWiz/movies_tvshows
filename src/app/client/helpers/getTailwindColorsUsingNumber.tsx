export default function getTailwindColorUsingNumber(id: number, darker = false, isIOS = false) {
  const colors = [
    ['bg-amber-50/30', 'bg-amber-100/30', 'bg-amber-200/30', 'bg-amber-300/30', 'bg-amber-400/30', 'bg-amber-500/30', 'bg-amber-600/30', 'bg-amber-700/30', 'bg-amber-800/30', 'bg-amber-900/30'],
    ['bg-yellow-50/30', 'bg-yellow-100/30', 'bg-yellow-200/30', 'bg-yellow-300/30', 'bg-yellow-400/30', 'bg-yellow-500/30', 'bg-yellow-600/30', 'bg-yellow-700/30', 'bg-yellow-800/30', 'bg-yellow-900/30'],
    ['bg-green-50/30', 'bg-green-100/30', 'bg-green-200/30', 'bg-green-300/30', 'bg-green-400/30', 'bg-green-500/30', 'bg-green-600/30', 'bg-green-700/30', 'bg-green-800/30', 'bg-green-900/30'],
    ['bg-emerald-50/30', 'bg-emerald-100/30', 'bg-emerald-200/30', 'bg-emerald-300/30', 'bg-emerald-400/30', 'bg-emerald-500/30', 'bg-emerald-600/30', 'bg-emerald-700/30', 'bg-emerald-800/30', 'bg-emerald-900/30'],
    ['bg-teal-50/30', 'bg-teal-100/30', 'bg-teal-200/30', 'bg-teal-300/30', 'bg-teal-400/30', 'bg-teal-500/30', 'bg-teal-600/30', 'bg-teal-700/30', 'bg-teal-800/30', 'bg-teal-900/30'],
    ['bg-cyan-50/30', 'bg-cyan-100/30', 'bg-cyan-200/30', 'bg-cyan-300/30', 'bg-cyan-400/30', 'bg-cyan-500/30', 'bg-cyan-600/30', 'bg-cyan-700/30', 'bg-cyan-800/30', 'bg-cyan-900/30'],
    ['bg-sky-50/30', 'bg-sky-100/30', 'bg-sky-200/30', 'bg-sky-300/30', 'bg-sky-400/30', 'bg-sky-500/30', 'bg-sky-600/30', 'bg-sky-700/30', 'bg-sky-800/30', 'bg-sky-900/30'],
    ['bg-slate-50/30', 'bg-slate-100/30', 'bg-slate-200/30', 'bg-slate-300/30', 'bg-slate-400/30', 'bg-slate-500/30', 'bg-slate-600/30', 'bg-slate-700/30', 'bg-slate-800/30', 'bg-slate-900/30'],
    ['bg-rose-50/30', 'bg-rose-100/30', 'bg-rose-200/30', 'bg-rose-300/30', 'bg-rose-400/30', 'bg-rose-500/30', 'bg-rose-600/30', 'bg-rose-700/30', 'bg-rose-800/30', 'bg-rose-900/30'],
  ]

  const colors2 = [
    [
      'bg-amber-500 #f59e0b', 'bg-amber-600 #d97706', 'bg-blue-700 #1d4ed8', 'bg-amber-800 #92400e', 'bg-amber-900 #78350f',
    ],
    [
      'bg-yellow-500 #eab308', 'bg-yellow-600 #ca8a04', 'bg-emerald-700 #047857', 'bg-yellow-800 #854d0e', 'bg-yellow-900 #713f12',
    ],
    [
      'bg-green-500 #22c55e', 'bg-green-600 #16a34a', 'bg-slate-700 #334155', 'bg-green-800 #166534', 'bg-green-900 #14532d',
    ],
    [
      'bg-emerald-500 #10b981', 'bg-emerald-600 #059669', 'bg-orange-700 #c2410c', 'bg-emerald-800 #065f46', 'bg-emerald-900 #064e3b',
    ],
    [
      'bg-teal-500 #14b8a6', 'bg-teal-600 #0d9488', 'bg-rose-700 #be123c', 'bg-teal-800 #115e59', 'bg-teal-900 #042f2e',
    ],
    [
      'bg-cyan-500 #06b6d4', 'bg-cyan-600 #0891b2', 'bg-stone-700 #44403c', 'bg-cyan-800 #155e75', 'bg-cyan-900 #164e63',
    ],
    [
      'bg-sky-500 #0ea5e9', 'bg-sky-600 #0284c7', 'bg-indigo-700 #4338ca', 'bg-sky-800 #075985', 'bg-sky-900 #0c4a6e',
    ],
    [
      'bg-slate-500 #64748b', 'bg-slate-600 #475569', 'bg-fuchsia-700 #a21caf', 'bg-slate-800 #1d2939', 'bg-slate-900 #0f172a',
    ],
    [
      'bg-rose-500 #f43f5e', 'bg-rose-600 #e11d48', 'bg-pink-700 #be185d', 'bg-rose-800 #9f1239', 'bg-rose-900 #881337',
    ],
  ]

  const colors2ForIOS = [
    [
      'bg-amber-500/20 #f59e0b', 'bg-amber-600/20 #d97706', 'bg-blue-700/20 #1d4ed8', 'bg-amber-800/20 #92400e', 'bg-amber-900/20 #78350f',
    ],
    [
      'bg-yellow-500/20 #eab308', 'bg-yellow-600/20 #ca8a04', 'bg-emerald-700/20 #047857', 'bg-yellow-800/20 #854d0e', 'bg-yellow-900/20 #713f12',
    ],
    [
      'bg-green-500/20 #22c55e', 'bg-green-600/20 #16a34a', 'bg-slate-700/20 #334155', 'bg-green-800/20 #166534', 'bg-green-900/20 #14532d',
    ],
    [
      'bg-emerald-500/20 #10b981', 'bg-emerald-600/20 #059669', 'bg-orange-700/20 #c2410c', 'bg-emerald-800/20 #065f46', 'bg-emerald-900/20 #064e3b',
    ],
    [
      'bg-teal-500/20 #14b8a6', 'bg-teal-600/20 #0d9488', 'bg-rose-700/20 #be123c', 'bg-teal-800/20 #115e59', 'bg-teal-900/20 #042f2e',
    ],
    [
      'bg-cyan-500/20 #06b6d4', 'bg-cyan-600/20 #0891b2', 'bg-stone-700/20 #44403c', 'bg-cyan-800/20 #155e75', 'bg-cyan-900/20 #164e63',
    ],
    [
      'bg-sky-500/20 #0ea5e9', 'bg-sky-600/20 #0284c7', 'bg-indigo-700/20 #4338ca', 'bg-sky-800/20 #075985', 'bg-sky-900/20 #0c4a6e',
    ],
    [
      'bg-slate-500/20 #64748b', 'bg-slate-600/20 #475569', 'bg-fuchsia-700/20 #a21caf', 'bg-slate-800/20 #1d2939', 'bg-slate-900/20 #0f172a',
    ],
    [
      'bg-rose-500/20 #f43f5e', 'bg-rose-600/20 #e11d48', 'bg-pink-700/20 #be185d', 'bg-rose-800/20 #9f1239', 'bg-rose-900/20 #881337',
    ],
  ]



  const colors3 = [
    ['bg-amber-700', 'bg-amber-800', 'bg-amber-900'],
    ['bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900'],
    ['bg-green-700', 'bg-green-800', 'bg-green-900'],
    ['bg-emerald-700', 'bg-emerald-800', 'bg-emerald-900'],
    ['bg-teal-700', 'bg-teal-800', 'bg-teal-900'],
    ['bg-cyan-700', 'bg-cyan-800', 'bg-cyan-900'],
    ['bg-sky-700', 'bg-sky-800', 'bg-sky-900'],
    ['bg-slate-700', 'bg-slate-800', 'bg-slate-900'],
    ['bg-rose-700', 'bg-rose-800', 'bg-rose-900'],
  ]

  const colors4 = [
    ['bg-amber-900'],
    ['bg-yellow-900'],
    ['bg-green-900'],
    ['bg-emerald-900'],
    ['bg-teal-900'],
    ['bg-cyan-900'],
    ['bg-sky-900'],
    // ['bg-slate-900'],
    ['bg-rose-900'],
  ]

  let idStr = id.toString()//142535
  return  darker 
    ? colors3[Number(idStr[0])-1] [Number(idStr[idStr.length-1])] 
    : isIOS 
      ? colors2ForIOS[Number(idStr[0])-1] [Number(idStr[1]) > 4 ? 4 : Number(idStr[1])]
      : colors2[Number(idStr[0])-1] [Number(idStr[1]) > 4 ? 4 : Number(idStr[1])]
}
