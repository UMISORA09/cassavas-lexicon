import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Mic, Camera, Volume2, Bookmark, Plus, Folder, BookOpen,
  BarChart2, Settings, Menu, X, Sun, Moon, ChevronRight, ArrowLeft,
  Sparkles, CheckCircle2, Clock, Flame, Brain, Edit3, Trash2,
  Download, Upload, Bell, WifiOff, HelpCircle, Share2, Filter,
  RotateCcw, Check, Award, Layers, Play, RefreshCw, Eye, Tag,
  Globe, Compass, Star, TrendingUp, AlertCircle, FileText, Zap,
  User, LogOut, Lock, Mail, EyeOff, ShieldCheck, Cloud, KeyRound,
  UserPlus, LogIn, Smartphone, Database, ShieldAlert, Users,
  CheckSquare, XSquare, Flag, Server, Activity, Sliders
} from 'lucide-react';

// ==========================================
// DỮ LIỆU MẪU PHONG PHÚ (MOCK DATABASE)
// ==========================================
const INITIAL_WORDS = [
  {
    id: 'w1',
    word: 'Serendipity',
    ipa: '/ˌser.ənˈdɪp.ə.ti/',
    pos: 'Danh từ',
    cefr: 'C1',
    langPair: 'EN-VI',
    meaning: 'Sự tình cờ may mắn; khả năng phát hiện ra những điều thú vị, có giá trị một cách ngẫu nhiên.',
    examples: [
      { en: 'Finding this cozy café was pure serendipity.', vi: 'Việc tìm thấy quán cà phê ấm cúng này hoàn toàn là một sự tình cờ may mắn.' },
      { en: 'Many scientific discoveries are a result of serendipity.', vi: 'Nhiều khám phá khoa học là kết quả của sự tình cờ may mắn.' }
    ],
    synonyms: ['Chance', 'Fluke', 'Happy accident', 'Good luck'],
    antonyms: ['Misfortune', 'Bad luck', 'Plan'],
    collocations: ['Pure serendipity (Hoàn toàn tình cờ)', 'A moment of serendipity (Khoảnh khắc kỳ diệu)'],
    grammarNote: 'Danh từ không đếm được (Uncountable noun). Thường đi kèm với tính từ "pure" hoặc "happy".',
    personalNote: 'Mẹo nhớ: "Se-ren-đi-pi-ty" -> Đi dạo (đi) gặp chuyện vui bất ngờ. Gặp lại từ này trong phim Serendipity (2001).',
    folderId: 'f3',
    status: 'learning', // 'new' | 'learning' | 'mastered'
    nextReview: '1 ngày',
    interval: 1,
    isFavorite: true,
    isWordOfTheDay: true
  },
  {
    id: 'w2',
    word: 'Resilient',
    ipa: '/rɪˈzɪl.i.ənt/',
    pos: 'Tính từ',
    cefr: 'B2',
    langPair: 'EN-VI',
    meaning: 'Kiên cường, có khả năng phục hồi nhanh chóng sau khó khăn, biến cố hoặc thay đổi (trong IT: hệ thống chịu lỗi tốt).',
    examples: [
      { en: 'We need to build a resilient microservices architecture.', vi: 'Chúng ta cần xây dựng một kiến trúc microservices có khả năng chịu lỗi và phục hồi tốt.' },
      { en: 'Children are often much more resilient than adults think.', vi: 'Trẻ em thường kiên cường hơn nhiều so với những gì người lớn nghĩ.' }
    ],
    synonyms: ['Tough', 'Flexible', 'Strong', 'Adaptable'],
    antonyms: ['Fragile', 'Vulnerable', 'Weak'],
    collocations: ['Resilient system (Hệ thống chịu lỗi)', 'Emotionally resilient (Tinh thần kiên cường)'],
    grammarNote: 'Danh từ tương ứng là Resilience (/rɪˈzɪl.jəns/).',
    personalNote: 'Hay dùng trong tài liệu System Design để chỉ hệ thống tự hồi phục khi sập node.',
    folderId: 'f1',
    status: 'mastered',
    nextReview: '7 ngày',
    interval: 7,
    isFavorite: true,
    isWordOfTheDay: false
  },
  {
    id: 'w3',
    word: 'Idempotent',
    ipa: '/ˌaɪ.dɛmˈpoʊ.tənt/',
    pos: 'Tính từ',
    cefr: 'C2',
    langPair: 'EN-VI',
    meaning: '(Công nghệ thông tin / Toán) Lũy đẳng; tính chất của một thao tác mà dù thực hiện 1 lần hay nhiều lần đều cho ra cùng một kết quả mà không gây tác dụng phụ.',
    examples: [
      { en: 'HTTP GET, PUT, and DELETE methods should be idempotent.', vi: 'Các phương thức HTTP GET, PUT và DELETE cần đảm bảo tính lũy đẳng.' },
      { en: 'An idempotent payment API prevents double charging.', vi: 'Một API thanh toán có tính idempotent giúp ngăn chặn việc trừ tiền hai lần.' }
    ],
    synonyms: ['Unchanging', 'Consistent', 'Repeatable'],
    antonyms: ['Non-idempotent', 'Mutating'],
    collocations: ['Idempotent API', 'Idempotent operation', 'Idempotency key'],
    grammarNote: 'Danh từ là Idempotence hoặc Idempotency.',
    personalNote: 'Câu hỏi phỏng vấn Backend cực kỳ phổ biến! Nhớ ví dụ: Bấm nút gọi thang máy nhiều lần cũng chỉ gọi 1 thang máy.',
    folderId: 'f1',
    status: 'learning',
    nextReview: '3 ngày',
    interval: 3,
    isFavorite: true,
    isWordOfTheDay: false
  },
  {
    id: 'w4',
    word: 'Bite the bullet',
    ipa: '/baɪt ðə ˈbʊl.ɪt/',
    pos: 'Idiom',
    cefr: 'C1',
    langPair: 'EN-VI',
    meaning: 'Cắn răng chịu đựng; quyết tâm đối mặt với một tình huống khó khăn không thể tránh khỏi.',
    examples: [
      { en: 'I had to bite the bullet and refactor the entire legacy codebase.', vi: 'Tôi đành phải cắn răng quyết tâm viết lại toàn bộ đống code cũ kỹ đó.' }
    ],
    synonyms: ['Face the music', 'Grin and bear it'],
    antonyms: ['Avoid', 'Chicken out'],
    collocations: ['Have to bite the bullet', 'Decide to bite the bullet'],
    grammarNote: 'Thành ngữ (Idiom). Nguồn gốc từ thời xưa khi binh lính phải cắn viên đạn chì lúc phẫu thuật không có thuốc tê.',
    personalNote: 'Hình ảnh cắn viên đạn khi đau -> Chấp nhận làm việc khó.',
    folderId: 'f4',
    status: 'new',
    nextReview: '10 phút',
    interval: 0,
    isFavorite: false,
    isWordOfTheDay: false
  },
  {
    id: 'w5',
    word: 'Ubiquitous',
    ipa: '/juːˈbɪk.wɪ.təs/',
    pos: 'Tính từ',
    cefr: 'C1',
    langPair: 'EN-VI',
    meaning: 'Có mặt ở khắp mọi nơi, phổ biến khắp chốn cùng một lúc.',
    examples: [
      { en: 'Smartphones have become ubiquitous in modern daily life.', vi: 'Điện thoại thông minh đã trở nên phổ biến ở khắp mọi nơi trong cuộc sống hiện đại.' }
    ],
    synonyms: ['Omnipresent', 'Everywhere', 'Pervasive', 'Universal'],
    antonyms: ['Rare', 'Scarce'],
    collocations: ['Become ubiquitous', 'Ubiquitous computing (Điện toán mọi nơi)'],
    grammarNote: 'Danh từ: Ubiquity.',
    personalNote: 'Hay xuất hiện trong bài đọc IELTS Reading chủ đề Công nghệ & Môi trường.',
    folderId: 'f3',
    status: 'learning',
    nextReview: '1 ngày',
    interval: 1,
    isFavorite: true,
    isWordOfTheDay: false
  },
  {
    id: 'w6',
    word: 'Articulate',
    ipa: '/ɑːˈtɪk.jə.lət/',
    pos: 'Động từ',
    cefr: 'C1',
    langPair: 'EN-VI',
    meaning: 'Diễn đạt, bày tỏ ý tưởng hoặc cảm xúc một cách rõ ràng, mạch lạc, lưu loát.',
    examples: [
      { en: 'She struggled to articulate her thoughts during the interview.', vi: 'Cô ấy gặp khó khăn trong việc diễn đạt mạch lạc suy nghĩ của mình trong buổi phỏng vấn.' }
    ],
    synonyms: ['Express', 'Communicate', 'Eloquent', 'Fluent'],
    antonyms: ['Mumble', 'Inarticulate', 'Hesitant'],
    collocations: ['Clearly articulate (Diễn đạt rõ ràng)', 'Articulate a vision (Trình bày tầm nhìn)'],
    grammarNote: 'Tính từ phát âm là /ɑːˈtɪk.jə.lət/, Động từ phát âm đuôi là /ɑːˈtɪk.jə.leɪt/.',
    personalNote: 'Từ rất đắt giá để viết vào CV: "Ability to articulate complex technical concepts".',
    folderId: 'f2',
    status: 'mastered',
    nextReview: '7 ngày',
    interval: 7,
    isFavorite: false,
    isWordOfTheDay: false
  },
  {
    id: 'w7',
    word: '木漏れ日 (Komorebi)',
    ipa: '/ko.mo.ɾe.bi/',
    pos: 'Danh từ',
    cefr: 'N2',
    langPair: 'JA-VI',
    meaning: 'Ánh nắng mặt trời chiếu xuyên qua kẽ lá của những tán cây.',
    examples: [
      { en: '森の中で美しい木漏れ日を見た。', vi: 'Tôi đã nhìn thấy những tia nắng xuyên qua tán lá tuyệt đẹp trong rừng.' }
    ],
    synonyms: ['日差し (Hizashi)'],
    antonyms: ['日陰 (Hikage)'],
    collocations: ['春の木漏れ日 (Nắng xuân xuyên kẽ lá)'],
    grammarNote: 'Ghép từ 木 (Mộc - cây), 漏れ (Rò rỉ/xuyên qua), 日 (Nhật - mặt trời).',
    personalNote: 'Một trong những từ tiếng Nhật đẹp nhất không có từ tương đương hoàn toàn trong tiếng Anh.',
    folderId: 'f2',
    status: 'new',
    nextReview: '10 phút',
    interval: 0,
    isFavorite: true,
    isWordOfTheDay: false
  },
  {
    id: 'w8',
    word: '눈치 (Nunchi)',
    ipa: '/nun.tɕʰi/',
    pos: 'Danh từ',
    cefr: 'TOPIK 4',
    langPair: 'KO-VI',
    meaning: 'Nghệ thuật tinh tế trong việc nắm bắt tâm lý, thái độ của người khác và bầu không khí xung quanh để ứng xử phù hợp.',
    examples: [
      { en: '그는 눈치가 정말 빠르다.', vi: 'Anh ấy thực sự rất tinh ý (nhạy bén nắm bắt ý tứ).' }
    ],
    synonyms: ['센스 (Sense)', '눈썰미'],
    antonyms: ['눈치 없다 (Kém tinh tế)'],
    collocations: ['눈치가 빠르다 (Nhanh nhạy, tinh ý)', '눈치를 보다 (Dò xét sắc mặt)'],
    grammarNote: 'Thường đi với tính từ 빠르다 (nhanh) hoặc 없다 (không có - vô duyên).',
    personalNote: 'Kỹ năng sinh tồn quan trọng trong văn hóa giao tiếp Hàn Quốc.',
    folderId: 'f2',
    status: 'learning',
    nextReview: '3 ngày',
    interval: 3,
    isFavorite: false,
    isWordOfTheDay: false
  }
];

const INITIAL_FOLDERS = [
  { id: 'f1', name: 'Chuyên ngành IT', icon: '💻', color: 'from-blue-500 to-indigo-600', desc: 'Thuật ngữ công nghệ, System Design & Phỏng vấn' },
  { id: 'f2', name: 'Giao tiếp hàng ngày', icon: '💬', color: 'from-emerald-500 to-teal-600', desc: 'Từ vựng phản xạ, giao tiếp công sở & đời sống' },
  { id: 'f3', name: 'IELTS Reading & Academic', icon: '🎓', color: 'from-violet-500 to-purple-600', desc: 'Từ vựng học thuật C1-C2 nâng band điểm' },
  { id: 'f4', name: 'Idioms & Phrasal Verbs', icon: '✨', color: 'from-amber-500 to-orange-600', desc: 'Thành ngữ tự nhiên như người bản xứ' }
];

const INITIAL_PENDING_CONTRIBUTIONS = [
  {
    id: 'c1',
    word: 'Concurrency',
    ipa: '/kənˈkʌr.ən.si/',
    pos: 'Danh từ',
    cefr: 'C1',
    langPair: 'EN-VI',
    meaning: '(CNTT) Tính đồng thời; khả năng thực thi nhiều tác vụ hoặc tiến trình cùng một khoảng thời gian.',
    contributor: 'xuanhoa.dev@tdc.edu.vn',
    submittedAt: '10 phút trước',
    personalNote: 'Hay đi kèm với Parallelism trong lập trình đa luồng Kotlin Coroutines.'
  },
  {
    id: 'c2',
    word: 'Zero-day',
    ipa: '/ˈzɪə.rəʊ.deɪ/',
    pos: 'Tính từ',
    cefr: 'C2',
    langPair: 'EN-VI',
    meaning: '(Bảo mật) Lỗ hổng phần mềm mới phát hiện chưa có bản vá chính thức từ nhà phát triển.',
    contributor: 'nguyen.le@tdc.edu.vn',
    submittedAt: '2 giờ trước',
    personalNote: 'Thuật ngữ quan trọng trong An toàn thông tin & Reverse Engineering.'
  },
  {
    id: 'c3',
    word: '改善 (Kaizen)',
    ipa: '/kai.zen/',
    pos: 'Danh từ',
    cefr: 'N3',
    langPair: 'JA-VI',
    meaning: 'Triết lý cải tiến liên tục từng bước nhỏ trong quy trình làm việc và phát triển phần mềm.',
    contributor: 'tin.tran@tdc.edu.vn',
    submittedAt: 'Hôm qua',
    personalNote: 'Áp dụng nhiều trong quy trình Agile / Scrum.'
  }
];

const INITIAL_MANAGED_USERS = [
  { id: 'u1', fullName: 'Văn Nguyễn Xuân Hòa', email: 'xuanhoa.dev@tdc.edu.vn', role: 'USER', streak: 18, wordsCount: 128, status: 'active' },
  { id: 'u2', fullName: 'Quản Trị Hệ Thống', email: 'admin@cassavas.edu.vn', role: 'ADMIN', streak: 45, wordsCount: 540, status: 'active' },
  { id: 'u3', fullName: 'Lê Hoàng Nguyên', email: 'nguyen.le@tdc.edu.vn', role: 'USER', streak: 9, wordsCount: 84, status: 'active' },
  { id: 'u4', fullName: 'Trần Minh Tín', email: 'tin.tran@tdc.edu.vn', role: 'USER', streak: 4, wordsCount: 52, status: 'locked' }
];

const INITIAL_SYSTEM_DECKS = [
  { id: 'sd1', title: '600 Từ Vựng TOEIC Cốt Lõi', category: 'Chứng chỉ quốc tế', wordCount: 600, downloads: 1240, published: true },
  { id: 'sd2', title: 'Tiếng Anh Chuyên Ngành CNTT & Кotlin', category: 'Công nghệ thông tin', wordCount: 350, downloads: 890, published: true },
  { id: 'sd3', title: 'Từ Vựng JLPT N3 - N2 Thực Chiến', category: 'Tiếng Nhật', wordCount: 420, downloads: 410, published: false }
];

const INITIAL_BUG_REPORTS = [
  { id: 'b1', word: 'Articulate', issue: 'Thiếu phân biệt phát âm giữa Động từ (/leɪt/) và Tính từ (/lət/)', reporter: 'xuanhoa.dev@tdc.edu.vn', status: 'open' },
  { id: 'b2', word: 'Idempotent', issue: 'Đề xuất bổ sung thêm ví dụ về RESTful API PUT/DELETE', reporter: 'nguyen.le@tdc.edu.vn', status: 'open' },
  { id: 'b3', word: 'Serendipity', issue: 'File âm thanh UK thỉnh thoảng trễ 0.5s khi Offline', reporter: 'tin.tran@tdc.edu.vn', status: 'resolved' }
];

// ==========================================
// COMPONENT CHÍNH (MAIN APPLICATION)
// ==========================================
export default function App() {
  // Quản lý giao diện & điều hướng
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'login' | 'register' | 'home' | 'notebook' | 'study' | 'stats' | 'profile' | 'admin'
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langPair, setLangPair] = useState('ALL'); // 'ALL' | 'EN-VI' | 'JA-VI' | 'KO-VI'

  // Quản lý Tài khoản, Phân quyền Role (USER / ADMIN), Đăng nhập, Đăng ký & Đăng xuất
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('USER'); // 'USER' | 'ADMIN'
  const [loginRoleSelect, setLoginRoleSelect] = useState('USER'); // Bộ chọn vai trò ngay tại màn hình Login
  const [userProfile, setUserProfile] = useState({
    fullName: 'Văn Nguyễn Xuân Hòa',
    email: 'xuanhoa.dev@tdc.edu.vn',
    role: 'Học viên C1 • Full-stack Lexicon',
    avatar: '👨💻',
    targetLang: 'EN-VI',
    defaultAccent: 'US',
    lastSync: 'Vừa xong (SQLite ↔ Cloud)'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: 'xuanhoa.dev@tdc.edu.vn', password: '••••••••••••' });
  const [registerForm, setRegisterForm] = useState({
    fullName: 'Văn Nguyễn Xuân Hòa',
    email: 'xuanhoa.it@tdc.edu.vn',
    password: '',
    confirmPassword: '',
    targetLang: 'EN-VI',
    dailyGoal: 20,
    agreeTerms: true
  });
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('xuanhoa.dev@tdc.edu.vn');
  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  // Quản lý Nghiệp vụ Quản trị viên (Admin CMS State)
  const [adminSubTab, setAdminSubTab] = useState('moderation'); // 'moderation' | 'users' | 'decks'
  const [pendingContributions, setPendingContributions] = useState(INITIAL_PENDING_CONTRIBUTIONS);
  const [managedUsers, setManagedUsers] = useState(INITIAL_MANAGED_USERS);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [systemDecks, setSystemDecks] = useState(INITIAL_SYSTEM_DECKS);
  const [bugReports, setBugReports] = useState(INITIAL_BUG_REPORTS);
  const [contributeToSystem, setContributeToSystem] = useState(true);

  // Quản lý dữ liệu từ điển & cá nhân
  const [words, setWords] = useState(INITIAL_WORDS);
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [detailTab, setDetailTab] = useState('meaning'); // 'meaning' | 'relations' | 'grammar' | 'notes'

  // Tìm kiếm & Bộ lọc Trang chủ
  const [searchQuery, setSearchQuery] = useState('');
  const [posFilter, setPosFilter] = useState('Tất cả');
  const [recentSearches, setRecentSearches] = useState(['Serendipity', 'Idempotent', 'Resilient', 'Bite the bullet']);
  const [activeScannerModal, setActiveScannerModal] = useState(null); // 'voice' | 'ocr' | null

  // Quản lý Sổ tay cá nhân & Thêm từ mới
  const [selectedFolderFilter, setSelectedFolderFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'new' | 'learning' | 'mastered'
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [newWordForm, setNewWordForm] = useState({
    word: '',
    ipa: '',
    pos: 'Danh từ',
    cefr: 'B2',
    langPair: 'EN-VI',
    meaning: '',
    exampleEn: '',
    exampleVi: '',
    personalNote: '',
    folderId: 'f1'
  });

  // Quản lý Màn hình Ôn tập SRS Flashcard & Quiz
  const [studyMode, setStudyMode] = useState('flashcard'); // 'flashcard' | 'quiz'
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [reviewedTodayCount, setReviewedTodayCount] = useState(14);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // Quản lý Hiệu ứng Âm thanh & Thông báo Toast
  const [playingAudio, setPlayingAudio] = useState(null); // 'US' | 'UK' | null
  const [toastMessage, setToastMessage] = useState(null);
  const [offlineMode, setOfflineMode] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  // Chỉnh sửa Ghi chú cá nhân trực tiếp
  const [editingNoteText, setEditingNoteText] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);

  // Hàm hiển thị Toast thông báo mượt mà (Không dùng alert)
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Giả lập phát âm thanh US/UK với sóng âm
  const triggerAudio = (accent, wordText, e) => {
    if (e) e.stopPropagation();
    setPlayingAudio(`${accent}-${wordText}`);
    // Sử dụng Web Speech API nếu trình duyệt hỗ trợ
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(wordText.replace(/\(.*\)/, ''));
        utterance.lang = accent === 'UK' ? 'en-GB' : accent === 'JA' ? 'ja-JP' : accent === 'KO' ? 'ko-KR' : 'en-US';
        utterance.rate = 0.92;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        // Fallback im lặng nếu môi trường chặn
      }
    }
    setTimeout(() => {
      setPlayingAudio(null);
    }, 1400);
  };

  // Từ vựng đang xem chi tiết
  const selectedWord = useMemo(
    () => words.find((w) => w.id === selectedWordId) || null,
    [words, selectedWordId]
  );

  // Khi mở chi tiết từ vựng, đồng bộ ghi chú cá nhân
  const openWordDetail = (wordObj, defaultTab = 'meaning') => {
    setSelectedWordId(wordObj.id);
    setDetailTab(defaultTab);
    setEditingNoteText(wordObj.personalNote || '');
    setIsEditingNote(false);
    if (!recentSearches.includes(wordObj.word)) {
      setRecentSearches((prev) => [wordObj.word, ...prev.slice(0, 5)]);
    }
  };

  // Từ vựng của ngày
  const wordOfTheDay = useMemo(
    () => words.find((w) => w.isWordOfTheDay) || words[0],
    [words]
  );

  // Danh sách kết quả tìm kiếm ở Trang chủ
  const filteredSearchWords = useMemo(() => {
    return words.filter((w) => {
      const matchLang = langPair === 'ALL' || w.langPair === langPair;
      const matchPos = posFilter === 'Tất cả' || w.pos === posFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        (w.personalNote && w.personalNote.toLowerCase().includes(q));
      return matchLang && matchPos && matchQuery;
    });
  }, [words, langPair, posFilter, searchQuery]);

  // Danh sách từ trong Sổ tay cá nhân
  const notebookWords = useMemo(() => {
    return words.filter((w) => {
      const matchFolder = selectedFolderFilter === 'ALL' || w.folderId === selectedFolderFilter;
      const matchStatus = statusFilter === 'ALL' || w.status === statusFilter;
      return matchFolder && matchStatus;
    });
  }, [words, selectedFolderFilter, statusFilter]);

  // Xử lý lưu ghi chú cá nhân
  const handleSavePersonalNote = () => {
    if (!selectedWord) return;
    setWords((prev) =>
      prev.map((w) => (w.id === selectedWord.id ? { ...w, personalNote: editingNoteText } : w))
    );
    setIsEditingNote(false);
    showToast('Đã lưu ghi chú cá nhân & mẹo nhớ từ!');
  };

  // Đổi thư mục lưu trữ cho từ vựng
  const handleChangeWordFolder = (wordId, newFolderId) => {
    setWords((prev) =>
      prev.map((w) => (w.id === wordId ? { ...w, folderId: newFolderId, isFavorite: true } : w))
    );
    const folderName = folders.find((f) => f.id === newFolderId)?.name;
    showToast(`Đã lưu vào bộ sưu tập "${folderName}"`);
  };

  // Đánh dấu Yêu thích / Lưu sổ tay nhanh
  const toggleFavoriteWord = (wordId, e) => {
    if (e) e.stopPropagation();
    setWords((prev) =>
      prev.map((w) => {
        if (w.id === wordId) {
          const nextFav = !w.isFavorite;
          showToast(nextFav ? `Đã lưu "${w.word}" vào sổ tay cá nhân` : `Đã bỏ lưu "${w.word}"`);
          return { ...w, isFavorite: nextFav };
        }
        return w;
      })
    );
  };

  // Thêm từ vựng cá nhân mới từ Modal
  const handleAddNewCustomWord = (e) => {
    e.preventDefault();
    if (!newWordForm.word.trim() || !newWordForm.meaning.trim()) {
      showToast('Vui lòng nhập Từ vựng và Nghĩa của từ!');
      return;
    }
    const createdWord = {
      id: `w_${Date.now()}`,
      word: newWordForm.word.trim(),
      ipa: newWordForm.ipa.trim() || '/ˈkʌs.təm/',
      pos: newWordForm.pos,
      cefr: newWordForm.cefr,
      langPair: newWordForm.langPair,
      meaning: newWordForm.meaning.trim(),
      examples: newWordForm.exampleEn.trim()
        ? [{ en: newWordForm.exampleEn.trim(), vi: newWordForm.exampleVi.trim() || 'Câu ví dụ cá nhân.' }]
        : [{ en: `Example sentence with ${newWordForm.word.trim()}.`, vi: 'Câu ví dụ minh họa tự tạo.' }],
      synonyms: ['Custom tag'],
      antonyms: [],
      collocations: [`Use "${newWordForm.word.trim()}" in context`],
      grammarNote: 'Từ vựng được người dùng tự thêm vào từ điển cá nhân.',
      personalNote: newWordForm.personalNote.trim() || 'Chưa có mẹo ghi nhớ riêng.',
      folderId: newWordForm.folderId,
      status: 'new',
      nextReview: '10 phút',
      interval: 0,
      isFavorite: true,
      isWordOfTheDay: false
    };

    setWords((prev) => [createdWord, ...prev]);
    if (contributeToSystem) {
      setPendingContributions((prev) => [
        {
          id: `c_${Date.now()}`,
          word: createdWord.word,
          ipa: createdWord.ipa,
          pos: createdWord.pos,
          cefr: createdWord.cefr,
          langPair: createdWord.langPair,
          meaning: createdWord.meaning,
          contributor: userProfile.email,
          submittedAt: 'Vừa xong',
          personalNote: createdWord.personalNote
        },
        ...prev
      ]);
    }
    setIsAddWordModalOpen(false);
    setNewWordForm({
      word: '',
      ipa: '',
      pos: 'Danh từ',
      cefr: 'B2',
      langPair: 'EN-VI',
      meaning: '',
      exampleEn: '',
      exampleVi: '',
      personalNote: '',
      folderId: 'f1'
    });
    showToast(
      contributeToSystem
        ? `Đã lưu "${createdWord.word}" & gửi đề xuất lên Admin duyệt!`
        : `Đã thêm từ "${createdWord.word}" vào Sổ tay cá nhân!`
    );
  };

  // Xử lý Nghiệp vụ Admin: Duyệt từ đóng góp vào Kho từ điển chung
  const handleApproveContribution = (item) => {
    const approvedWord = {
      id: `sys_${Date.now()}`,
      word: item.word,
      ipa: item.ipa,
      pos: item.pos,
      cefr: item.cefr,
      langPair: item.langPair,
      meaning: item.meaning,
      examples: [{ en: `System verified example for ${item.word}.`, vi: 'Ví dụ chuẩn đã được Quản trị viên kiểm duyệt.' }],
      synonyms: ['Verified Term'],
      antonyms: [],
      collocations: [`Standard ${item.word}`],
      grammarNote: `Từ vựng đóng góp bởi ${item.contributor}, đã được Admin phê duyệt vào Kho từ hệ thống.`,
      personalNote: item.personalNote,
      folderId: 'f1',
      status: 'new',
      nextReview: '10 phút',
      interval: 0,
      isFavorite: true,
      isWordOfTheDay: false
    };
    setWords((prev) => [approvedWord, ...prev]);
    setPendingContributions((prev) => prev.filter((c) => c.id !== item.id));
    showToast(`Admin: Đã duyệt từ "${item.word}" vào Kho từ điển Hệ thống!`);
  };

  const handleRejectContribution = (id, wordText) => {
    setPendingContributions((prev) => prev.filter((c) => c.id !== id));
    showToast(`Admin: Đã từ chối từ đóng góp "${wordText}".`);
  };

  // Xử lý Nghiệp vụ Admin: Khóa / Mở khóa User & Đổi quyền User <-> Admin
  const handleToggleUserStatus = (uid) => {
    setManagedUsers((prev) =>
      prev.map((u) => {
        if (u.id === uid) {
          const nextStatus = u.status === 'active' ? 'locked' : 'active';
          showToast(
            nextStatus === 'locked'
              ? `Admin: Đã khóa tài khoản ${u.email}`
              : `Admin: Đã mở khóa tài khoản ${u.email}`
          );
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleToggleUserRole = (uid) => {
    setManagedUsers((prev) =>
      prev.map((u) => {
        if (u.id === uid) {
          const nextRole = u.role === 'ADMIN' ? 'USER' : 'ADMIN';
          showToast(`Admin: Đã cấp quyền ${nextRole} cho ${u.fullName}`);
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  // Xử lý đánh giá thuật toán lặp lại ngắt quãng SM-2 (Quên / Khó / Tốt / Dễ)
  const handleSrsGrade = (gradeLabel, nextIntervalText, newStatus) => {
    const currentCard = words[currentCardIndex % words.length];
    if (!currentCard) return;

    setWords((prev) =>
      prev.map((w) =>
        w.id === currentCard.id
          ? { ...w, nextReview: nextIntervalText, status: newStatus }
          : w
      )
    );
    setReviewedTodayCount((c) => c + 1);
    setIsCardFlipped(false);
    showToast(`SM-2: Đánh giá "${gradeLabel}" • Lặp lại sau ${nextIntervalText}`);

    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % words.length);
    }, 180);
  };

  // Tạo câu hỏi Trắc nghiệm nhanh (Quiz 4 đáp án)
  const currentStudyWord = words[currentCardIndex % words.length] || words[0];
  const quizOptions = useMemo(() => {
    if (!currentStudyWord) return [];
    const others = words.filter((w) => w.id !== currentStudyWord.id).slice(0, 3);
    const combined = [currentStudyWord, ...others];
    // Sắp xếp cố định theo ID để không bị nhảy đáp án khi re-render
    return combined.sort((a, b) => a.id.localeCompare(b.id));
  }, [currentStudyWord, words]);

  const handleSelectQuizOption = (optionWord) => {
    if (quizSelectedOption) return;
    setQuizSelectedOption(optionWord.id);
    if (optionWord.id === currentStudyWord.id) {
      setQuizScore((s) => s + 10);
      setReviewedTodayCount((c) => c + 1);
      showToast('Chính xác! +10 XP điểm ghi nhớ');
    } else {
      showToast('Chưa chính xác! Hãy xem lại nghĩa của từ nhé.');
    }
  };

  const nextQuizQuestion = () => {
    setQuizSelectedOption(null);
    setCurrentCardIndex((prev) => (prev + 1) % words.length);
  };

  // Thống kê số lượng theo trạng thái học
  const statsSummary = useMemo(() => {
    const newCount = words.filter((w) => w.status === 'new').length;
    const learningCount = words.filter((w) => w.status === 'learning').length;
    const masteredCount = words.filter((w) => w.status === 'mastered').length;
    return { total: words.length, newCount, learningCount, masteredCount };
  }, [words]);

  // Chuyển nhanh tài khoản Demo User / Admin trên màn hình Đăng nhập
  const handleSelectLoginRole = (roleType) => {
    setLoginRoleSelect(roleType);
    if (roleType === 'ADMIN') {
      setLoginForm({ email: 'admin@cassavas.edu.vn', password: '••••••••••••' });
    } else {
      setLoginForm({ email: 'xuanhoa.dev@tdc.edu.vn', password: '••••••••••••' });
    }
  };

  // Xử lý Đăng nhập theo Role (User hoặc Admin)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setUserRole(loginRoleSelect);
    if (loginRoleSelect === 'ADMIN') {
      setUserProfile({
        fullName: 'Quản Trị Viên (Admin)',
        email: loginForm.email || 'admin@cassavas.edu.vn',
        role: 'System Administrator • Toàn quyền CMS & SQLite',
        avatar: '🛡️',
        targetLang: 'EN-VI',
        defaultAccent: 'US',
        lastSync: 'Máy chủ Hệ thống (Cloud Master)'
      });
      setActiveTab('admin');
      showToast('Đăng nhập thành công với quyền Quản trị viên (ADMIN)!');
    } else {
      setUserProfile({
        fullName: 'Văn Nguyễn Xuân Hòa',
        email: loginForm.email || 'xuanhoa.dev@tdc.edu.vn',
        role: 'Học viên C1 • Full-stack Lexicon',
        avatar: '👨💻',
        targetLang: 'EN-VI',
        defaultAccent: 'US',
        lastSync: 'Vừa xong (SQLite ↔ Cloud)'
      });
      setActiveTab('home');
      showToast('Chào mừng học viên Văn Nguyễn Xuân Hòa!');
    }
  };

  // Xử lý Đăng ký tài khoản mới
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.fullName.trim() || !registerForm.email.trim()) {
      showToast('Vui lòng điền đầy đủ Họ tên và Email!');
      return;
    }
    setUserProfile((prev) => ({
      ...prev,
      fullName: registerForm.fullName.trim(),
      email: registerForm.email.trim(),
      targetLang: registerForm.targetLang
    }));
    setDailyGoal(Number(registerForm.dailyGoal) || 20);
    setIsAuthenticated(true);
    setActiveTab('home');
    showToast('Tạo tài khoản thành công! Đã khởi tạo SQLite cục bộ.');
  };

  // Xử lý xác nhận Đăng xuất
  const handleConfirmLogout = () => {
    setLogoutConfirmModal(false);
    setDrawerOpen(false);
    setSelectedWordId(null);
    setIsAuthenticated(false);
    setActiveTab('login');
    showToast('Đã đăng xuất an toàn! Dữ liệu Offline đã được bảo toàn.');
  };

  // Chuyển nhanh 11 màn hình từ thanh công cụ Demo bên trên (Phục vụ báo cáo & xuất Figma)
  const jumpToScreen = (screenKey) => {
    setDrawerOpen(false);
    setActiveScannerModal(null);
    setForgotPasswordModal(false);
    setLogoutConfirmModal(false);
    setIsAddWordModalOpen(false);
    setSelectedWordId(null);

    if (screenKey === 'login') {
      setActiveTab('login');
    } else if (screenKey === 'register') {
      setActiveTab('register');
    } else if (screenKey === 'home') {
      setActiveTab('home');
    } else if (screenKey === 'search') {
      setActiveTab('search');
    } else if (screenKey === 'detail') {
      setActiveTab('search');
      openWordDetail(words[0], 'meaning');
    } else if (screenKey === 'notebook') {
      setActiveTab('notebook');
    } else if (screenKey === 'addword') {
      setActiveTab('notebook');
      setIsAddWordModalOpen(true);
    } else if (screenKey === 'study') {
      setStudyMode('flashcard');
      setActiveTab('study');
    } else if (screenKey === 'quiz') {
      setStudyMode('quiz');
      setActiveTab('study');
    } else if (screenKey === 'stats') {
      setActiveTab('stats');
    } else if (screenKey === 'profile') {
      setActiveTab('profile');
    } else if (screenKey === 'admin') {
      setUserRole('ADMIN');
      setActiveTab('admin');
    } else if (screenKey === 'drawer') {
      setActiveTab('home');
      setDrawerOpen(true);
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'} flex flex-col items-center justify-start py-4 px-2 sm:px-6 font-sans select-none`}>
      
      {/* =====================================================================
          THANH ĐIỀU KHIỂN TRÌNH CHIẾU ĐỒ ÁN (11 MÀN HÌNH + PHÂN QUYỀN USER/ADMIN)
         ===================================================================== */}
      <div className={`w-full max-w-6xl mb-4 rounded-2xl p-3 shadow-md border backdrop-blur-md transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-indigo-100'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold text-sm sm:text-base tracking-tight">
                  Cassavas Lexicon • Đồ Án Từ Điển Cá Nhân Ngoại Ngữ
                </h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 border border-indigo-500/20">
                  11 Màn hình • User & Admin CMS
                </span>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    userRole === 'ADMIN'
                      ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                  }`}
                >
                  ROLE: {userRole}
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Đầy đủ 4 tiêu chí chấm đồ án: Login User/Admin • Quản trị Hệ thống • Nghiệp vụ SM-2 & Kiểm duyệt từ • Tính ứng dụng Offline SQLite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Nút chuyển nhanh quyền User <-> Admin để giảng viên chấm bài */}
            <button
              onClick={() => {
                const nextRole = userRole === 'ADMIN' ? 'USER' : 'ADMIN';
                setUserRole(nextRole);
                showToast(`Đã chuyển sang quyền ${nextRole} để kiểm thử nghiệp vụ!`);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                userRole === 'ADMIN'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                  : 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
              }`}
              title="Đổi nhanh vai trò User / Admin"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Đổi Role: {userRole}</span>
            </button>

            <button
              onClick={() => jumpToScreen('drawer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                drawerOpen
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Drawer</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Các nút chuyển nhanh 11 màn hình của đồ án */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'login', label: '1. Đăng nhập (User/Admin)', icon: LogIn },
            { id: 'register', label: '2. Đăng ký', icon: UserPlus },
            { id: 'home', label: '3. Trang chủ Dashboard', icon: Compass },
            { id: 'search', label: '4. Tra cứu tức thì', icon: Search },
            { id: 'detail', label: '5. Chi tiết từ & Mnemonic', icon: BookOpen },
            { id: 'notebook', label: '6. Sổ tay cá nhân', icon: Folder },
            { id: 'addword', label: '7. Thêm/Đóng góp từ', icon: Plus },
            { id: 'study', label: '8. Flashcard SM-2', icon: Layers },
            { id: 'quiz', label: '9. Trắc nghiệm Quiz', icon: HelpCircle },
            { id: 'stats', label: '10. Thống kê học tập', icon: BarChart2 },
            { id: 'profile', label: '11. Hồ sơ & Đăng xuất', icon: User },
            { id: 'admin', label: '12. Quản trị Admin (CMS)', icon: ShieldAlert }
          ].map((item) => {
            const IconComp = item.icon;
            const isCurrent =
              (item.id === 'detail' && selectedWordId !== null && !drawerOpen) ||
              (item.id === 'addword' && isAddWordModalOpen && !drawerOpen) ||
              (item.id === 'study' && activeTab === 'study' && studyMode === 'flashcard' && !selectedWordId) ||
              (item.id === 'quiz' && activeTab === 'study' && studyMode === 'quiz' && !selectedWordId) ||
              (!drawerOpen &&
                !selectedWordId &&
                !isAddWordModalOpen &&
                item.id !== 'study' &&
                item.id !== 'quiz' &&
                activeTab === item.id);

            return (
              <button
                key={item.id}
                onClick={() => jumpToScreen(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isCurrent
                    ? item.id === 'admin'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm'
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/30'
                    : darkMode
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          KHUNG ĐIỆN THOẠI DI ĐỘNG (MOBILE FRAME 390 x 844 px)
         ===================================================================== */}
      <div className="relative flex items-center justify-center w-full">
        <div
          className={`relative w-[390px] h-[844px] rounded-[46px] p-[11px] shadow-2xl transition-colors duration-300 ${
            darkMode
              ? 'bg-slate-800 shadow-black/80 ring-1 ring-slate-700'
              : 'bg-slate-900 shadow-indigo-950/25 ring-1 ring-slate-800'
          }`}
        >
          {/* Màn hình bên trong điện thoại */}
          <div
            className={`relative w-full h-full rounded-[36px] overflow-hidden flex flex-col transition-colors duration-300 ${
              darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
            }`}
          >
            {/* Thanh Trạng Thái iOS / Android Modern + Dynamic Island */}
            <div className={`w-full pt-2.5 pb-1.5 px-6 flex items-center justify-between text-[11px] font-semibold z-30 shrink-0 ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
              <span>09:41</span>
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
                  <div className="w-full h-full bg-current rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Thông báo Toast Nổi Bên Trong Điện Thoại */}
            {toastMessage && (
              <div className="absolute top-12 left-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white text-xs font-medium shadow-xl border border-slate-700/80 animate-bounce">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{toastMessage}</span>
              </div>
            )}

            {/* ===============================================================
                CUSTOM NAVIGATION DRAWER (MENU TRƯỢT BÊN TRÁI + NÚT ĐĂNG XUẤT)
               =============================================================== */}
            {drawerOpen && (
              <div
                onClick={() => setDrawerOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-opacity duration-300"
              />
            )}
            <div
              className={`absolute top-0 bottom-0 left-0 w-[305px] z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between ${
                drawerOpen ? 'translate-x-0' : '-translate-x-full'
              } ${darkMode ? 'bg-slate-900 border-r border-slate-800' : 'bg-white border-r border-slate-100'} shadow-2xl`}
            >
              {/* Phần đầu Drawer: Hồ sơ cá nhân */}
              <div>
                <div className="p-5 pt-10 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-md" />
                  <div className="flex items-center justify-between mb-3">
                    <div
                      onClick={() => {
                        setDrawerOpen(false);
                        setSelectedWordId(null);
                        setActiveTab('profile');
                      }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/30 shadow-inner">
                        {userProfile.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{userProfile.fullName}</h3>
                        <p className="text-[11px] text-indigo-100">{userProfile.email}</p>
                        <span className="inline-block mt-0.5 text-[9px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 font-semibold">
                          ● Đã đồng bộ SQLite
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setDrawerOpen(false)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mục tiêu ngày trong Drawer */}
                  <div className="mt-3 bg-white/10 rounded-xl p-2.5 backdrop-blur-sm border border-white/15">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-indigo-100 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Chuỗi 18 ngày liên tiếp
                      </span>
                      <span className="font-bold">{reviewedTodayCount}/{dailyGoal} từ</span>
                    </div>
                    <div className="w-full h-1.5 bg-indigo-950/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-300 to-emerald-400 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (reviewedTodayCount / dailyGoal) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Danh sách menu điều hướng & tính năng nâng cao */}
                <div className="p-3 space-y-1 overflow-y-auto max-h-[450px]">
                  <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Không gian học tập & Nghiệp vụ
                  </p>
                  {[
                    { id: 'home', label: 'Trang chủ Dashboard', icon: Compass, badge: 'Mới' },
                    { id: 'search', label: 'Tra cứu tức thì', icon: Search, badge: 'AI OCR' },
                    { id: 'notebook', label: 'Sổ tay từ vựng cá nhân', icon: Folder, badge: `${words.length} từ` },
                    { id: 'study', label: 'Ôn tập Spaced Repetition', icon: Layers, badge: 'SM-2' },
                    { id: 'stats', label: 'Phân tích & Tiến độ học', icon: BarChart2, badge: null },
                    { id: 'profile', label: 'Hồ sơ cá nhân & Tài khoản', icon: User, badge: userRole },
                    { id: 'admin', label: 'Quản trị hệ thống (Admin CMS)', icon: ShieldAlert, badge: `${pendingContributions.length} chờ duyệt` }
                  ].map((nav) => {
                    const Icon = nav.icon;
                    return (
                      <button
                        key={nav.id}
                        onClick={() => {
                          if (nav.id === 'admin') setUserRole('ADMIN');
                          setActiveTab(nav.id);
                          setSelectedWordId(null);
                          setDrawerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                          activeTab === nav.id
                            ? 'bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 font-semibold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${nav.id === 'admin' ? 'text-amber-500' : ''}`} />
                          <span>{nav.label}</span>
                        </div>
                        {nav.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              nav.id === 'admin'
                                ? 'bg-amber-500/15 text-amber-500'
                                : 'bg-indigo-500/10 text-indigo-500'
                            }`}
                          >
                            {nav.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <div className={`my-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`} />
                  <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quản lý dữ liệu & Cài đặt nhanh
                  </p>

                  {/* Nhập / Xuất CSV JSON */}
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      showToast('Đã xuất dữ liệu từ điển ra file cassavas_backup.sqlite!');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-emerald-500" />
                      <span>Sao lưu SQLite / Xuất CSV</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Công tắc Chế độ Offline */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium">
                    <div className="flex items-center gap-2.5">
                      <WifiOff className="w-4 h-4 text-violet-500" />
                      <div>
                        <p>Chế độ Ngoại tuyến (Offline)</p>
                        <p className="text-[10px] text-slate-400">Đã tải gói âm thanh US/UK</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setOfflineMode(!offlineMode);
                        showToast(!offlineMode ? 'Đã bật Chế độ Offline' : 'Đã tắt Chế độ Offline');
                      }}
                      className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                        offlineMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          offlineMode ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Công tắc Dark Mode trong Drawer */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium">
                    <div className="flex items-center gap-2.5">
                      {darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                      <span>Giao diện Ban đêm (Dark Mode)</span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                        darkMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          darkMode ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer của Drawer: Nút Đăng Xuất Nhanh */}
              <div className={`p-3.5 border-t space-y-2 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <button
                  onClick={() => setLogoutConfirmModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất tài khoản</span>
                </button>
                <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Cassavas Lexicon v2.5</span>
                  <span className="text-indigo-500 font-semibold">Kotlin • XML Views</span>
                </div>
              </div>
            </div>

            {/* ===============================================================
                NỘI DUNG CHÍNH CỦA 11 MÀN HÌNH (SCROLLABLE VIEWPORT)
               =============================================================== */}
            <div className={`flex-1 overflow-y-auto overflow-x-hidden ${activeTab === 'login' || activeTab === 'register' ? 'pb-6' : 'pb-20'} no-scrollbar relative`}>
              
              {/* -------------------------------------------------------------
                  1. MÀN HÌNH ĐĂNG NHẬP PHÂN QUYỀN USER / ADMIN (ROLE-BASED LOGIN)
                 ------------------------------------------------------------- */}
              {activeTab === 'login' && !selectedWord && (
                <div className="p-5 flex flex-col justify-between min-h-full space-y-4 animate-fadeIn">
                  {/* Phần đầu: Logo & Slogan */}
                  <div className="pt-1 text-center space-y-1.5">
                    <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 mx-auto flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 border border-white/20">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight">
                      Cassavas Lexicon
                    </h2>
                    <p className="text-[11px] text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                      Hệ thống Từ điển Cá nhân & Quản trị Học liệu Đa ngôn ngữ (SQLite + Cloud Sync)
                    </p>
                  </div>

                  {/* BỘ CHỌN VAI TRÒ ĐĂNG NHẬP: HỌC VIÊN (USER) vs QUẢN TRỊ VIÊN (ADMIN) */}
                  <div className={`p-2.5 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/70 border-slate-700' : 'bg-indigo-50/60 border-indigo-100'}`}>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500">
                        Chọn vai trò đăng nhập (Role-Based Auth)
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">Tự điền tài khoản mẫu</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectLoginRole('USER')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                          loginRoleSelect === 'USER'
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                            : darkMode
                            ? 'bg-slate-900 border-slate-700 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>👤 Học viên (User)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectLoginRole('ADMIN')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                          loginRoleSelect === 'ADMIN'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-500 shadow-md shadow-amber-500/20'
                            : darkMode
                            ? 'bg-slate-900 border-slate-700 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>🛡️ Quản trị (Admin)</span>
                      </button>
                    </div>
                  </div>

                  {/* Form Đăng nhập */}
                  <form onSubmit={handleLoginSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        {loginRoleSelect === 'ADMIN' ? 'Email Quản trị viên (Admin ID)' : 'Email Học viên (User ID)'}
                      </label>
                      <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all ${darkMode ? 'bg-slate-800/90 border-slate-700 focus-within:border-indigo-500' : 'bg-white border-slate-200 focus-within:border-indigo-500 shadow-sm'}`}>
                        <Mail className={`w-4 h-4 shrink-0 ${loginRoleSelect === 'ADMIN' ? 'text-amber-500' : 'text-indigo-500'}`} />
                        <input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          placeholder="nhapemail@domain.com"
                          className="w-full bg-transparent text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Mật khẩu xác thực
                      </label>
                      <div className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all ${darkMode ? 'bg-slate-800/90 border-slate-700 focus-within:border-indigo-500' : 'bg-white border-slate-200 focus-within:border-indigo-500 shadow-sm'}`}>
                        <Lock className={`w-4 h-4 shrink-0 ${loginRoleSelect === 'ADMIN' ? 'text-amber-500' : 'text-indigo-500'}`} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="Nhập mật khẩu..."
                          className="w-full bg-transparent text-xs font-medium focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-400 hover:text-indigo-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Ghi nhớ đăng nhập & Quên mật khẩu */}
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                        />
                        <span className="text-slate-500 dark:text-slate-300 font-medium">
                          Lưu phiên (SharedPreferences)
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setForgotPasswordModal(true)}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>

                    {/* Nút Đăng nhập chính thay đổi theo Role */}
                    <button
                      type="submit"
                      className={`w-full py-3.5 rounded-2xl text-white text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 transition-all ${
                        loginRoleSelect === 'ADMIN'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/25'
                          : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-500/25'
                      }`}
                    >
                      {loginRoleSelect === 'ADMIN' ? (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Đăng nhập Quản Trị Hệ Thống (Admin CMS)</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          <span>Đăng nhập Sổ Tay Học Viên (User)</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Phân cách đăng nhập nhanh */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`flex-1 h-px ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Hoặc xác thực nhanh OAuth2 / Offline
                      </span>
                      <div className={`flex-1 h-px ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAuthenticated(true);
                          setUserRole('USER');
                          setActiveTab('home');
                          showToast('Đã đăng nhập bằng Google Account!');
                        }}
                        className={`py-2 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                          darkMode
                            ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                            : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                        }`}
                      >
                        <span className="text-sm">🌐</span>
                        <span>Google</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAuthenticated(true);
                          setUserRole('USER');
                          setActiveTab('home');
                          showToast('Đã đăng nhập bằng GitHub (UMISORA09)!');
                        }}
                        className={`py-2 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                          darkMode
                            ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                            : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                        }`}
                      >
                        <span className="text-sm">🐙</span>
                        <span>GitHub</span>
                      </button>
                    </div>

                    {/* Chế độ Khách (Offline SQLite Mode) */}
                    <button
                      type="button"
                      onClick={() => {
                        setUserRole('USER');
                        setActiveTab('home');
                        showToast('Đang sử dụng Chế độ Ngoại tuyến (SQLite Local)');
                      }}
                      className={`w-full py-2 px-3 rounded-2xl border border-dashed text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        darkMode
                          ? 'border-slate-700 text-slate-300 hover:border-indigo-500'
                          : 'border-indigo-200 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50'
                      }`}
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>Chế độ Khách • Tra cứu Offline SQLite không cần mạng</span>
                    </button>
                  </div>

                  {/* Chuyển sang màn hình Đăng ký */}
                  <div className="text-center text-xs pt-1.5 border-t border-slate-200/70 dark:border-slate-800">
                    <span className="text-slate-400">Chưa có tài khoản cá nhân? </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline"
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  2. MÀN HÌNH ĐĂNG KÝ TÀI KHOẢN (REGISTER SCREEN)
                 ------------------------------------------------------------- */}
              {activeTab === 'register' && !selectedWord && (
                <div className="p-5 space-y-4 animate-fadeIn">
                  {/* Header quay lại Đăng nhập */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Đăng nhập</span>
                    </button>
                    <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider">
                      Bước 1/1 • Tạo Hồ Sơ
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold tracking-tight">Tạo Tài Khoản Mới</h2>
                    <p className="text-xs text-slate-400">
                      Cá nhân hóa kho từ vựng & mục tiêu ghi nhớ hàng ngày của bạn
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold block mb-1 text-slate-500 dark:text-slate-300">
                        Họ và tên người học *
                      </label>
                      <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <User className="w-4 h-4 text-indigo-500 shrink-0" />
                        <input
                          type="text"
                          required
                          value={registerForm.fullName}
                          onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                          placeholder="Nhập họ và tên..."
                          className="w-full bg-transparent focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold block mb-1 text-slate-500 dark:text-slate-300">
                        Địa chỉ Email đồng bộ *
                      </label>
                      <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                        <input
                          type="email"
                          required
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          placeholder="sinhvien@tdc.edu.vn"
                          className="w-full bg-transparent focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="font-bold block mb-1 text-slate-500 dark:text-slate-300">
                          Mật khẩu *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}
                        />
                      </div>
                      <div>
                        <label className="font-bold block mb-1 text-slate-500 dark:text-slate-300">
                          Xác nhận MK *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                          className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}
                        />
                      </div>
                    </div>

                    {/* Chọn cặp ngôn ngữ mục tiêu */}
                    <div>
                      <label className="font-bold block mb-1.5 text-slate-500 dark:text-slate-300">
                        Ngôn ngữ mục tiêu chính
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { code: 'EN-VI', label: '🇬🇧 Anh - Việt' },
                          { code: 'JA-VI', label: '🇯🇵 Nhật - Việt' },
                          { code: 'KO-VI', label: '🇰🇷 Hàn - Việt' }
                        ].map((lang) => (
                          <button
                            type="button"
                            key={lang.code}
                            onClick={() => setRegisterForm({ ...registerForm, targetLang: lang.code })}
                            className={`py-2 px-2 rounded-xl border font-bold text-[11px] transition-all ${
                              registerForm.targetLang === lang.code
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : darkMode
                                ? 'bg-slate-800 border-slate-700 text-slate-300'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chọn mục tiêu số từ mỗi ngày */}
                    <div>
                      <label className="font-bold block mb-1.5 text-slate-500 dark:text-slate-300">
                        Mục tiêu ôn tập hàng ngày (SM-2)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { goal: 10, desc: '10 từ / ngày' },
                          { goal: 20, desc: '20 từ / ngày' },
                          { goal: 30, desc: '30 từ / ngày' }
                        ].map((g) => (
                          <button
                            type="button"
                            key={g.goal}
                            onClick={() => setRegisterForm({ ...registerForm, dailyGoal: g.goal })}
                            className={`py-2 px-2 rounded-xl border font-bold text-[11px] transition-all ${
                              registerForm.dailyGoal === g.goal
                                ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                                : darkMode
                                ? 'bg-slate-800 border-slate-700 text-slate-300'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            {g.desc}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-start gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={registerForm.agreeTerms}
                        onChange={(e) => setRegisterForm({ ...registerForm, agreeTerms: e.target.checked })}
                        className="mt-0.5 rounded text-indigo-600"
                      />
                      <span className="text-[11px] text-slate-400 leading-relaxed">
                        Tôi đồng ý với Điều khoản sử dụng và cho phép ứng dụng tạo cơ sở dữ liệu{' '}
                        <strong className="text-indigo-500">SQLite Offline</strong> trên thiết bị.
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Hoàn tất Đăng ký & Bắt đầu</span>
                    </button>
                  </form>
                </div>
              )}

                            {/* -------------------------------------------------------------
                  3. MÀN HÌNH TRANG CHỦ MỚI (HOME DASHBOARD COMMAND CENTER)
                 ------------------------------------------------------------- */}
              {activeTab === 'home' && !selectedWord && (
                <div className="p-4 space-y-4 animate-fadeIn">
                  {/* Header: Drawer Button + Lời chào người dùng + Avatar Hồ sơ */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => setDrawerOpen(true)}
                        className={`p-2.5 rounded-2xl border transition-colors ${
                          darkMode
                            ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-800'
                            : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-100 shadow-sm'
                        }`}
                        title="Mở Navigation Drawer"
                      >
                        <Menu className="w-5 h-5" />
                      </button>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                            Chào buổi sáng, {userProfile.name}
                          </h2>
                          <span className="text-sm">👋</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Hôm nay hãy cùng bứt phá 20 từ vựng nhé!
                        </p>
                      </div>
                    </div>

                    {/* Nút Avatar mở nhanh màn hình Hồ sơ & Đăng xuất */}
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-base shadow-sm border border-indigo-400/30 relative"
                      title="Hồ sơ cá nhân & Đăng xuất"
                    >
                      {userProfile.avatar}
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                    </button>
                  </div>

                  {/* Thanh chọn cặp ngôn ngữ */}
                  <div className={`flex items-center justify-between p-1 rounded-2xl border ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                    {[
                      { code: 'ALL', label: '🌐 Tất cả' },
                      { code: 'EN-VI', label: '🇬🇧 Anh-Việt' },
                      { code: 'JA-VI', label: '🇯🇵 Nhật' },
                      { code: 'KO-VI', label: '🇰🇷 Hàn' }
                    ].map((lp) => (
                      <button
                        key={lp.code}
                        onClick={() => setLangPair(lp.code)}
                        className={`flex-1 py-1 px-1.5 rounded-xl text-[11px] font-semibold transition-all text-center ${
                          langPair === lp.code
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : darkMode
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-600 hover:text-indigo-600'
                        }`}
                      >
                        {lp.label}
                      </button>
                    ))}
                  </div>

                  {/* Thanh tìm kiếm nhanh mở thẳng Tra cứu tức thì */}
                  <div
                    onClick={() => setActiveTab('search')}
                    className={`cursor-pointer flex items-center justify-between px-3.5 py-3 rounded-2xl border transition-all ${
                      darkMode
                        ? 'bg-slate-800/90 border-slate-700 hover:border-indigo-500/70 text-slate-300'
                        : 'bg-white border-indigo-100 shadow-md shadow-indigo-500/5 hover:border-indigo-400 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Search className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span className="text-xs text-slate-400 font-medium">
                        Tra từ điển tức thì, nghĩa, IPA...
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab('search');
                          setActiveScannerModal('voice');
                        }}
                        className="p-1 rounded-lg bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20"
                        title="Tra cứu giọng nói"
                      >
                        <Mic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab('search');
                          setActiveScannerModal('ocr');
                        }}
                        className="p-1 rounded-lg bg-violet-500/10 text-violet-500 hover:bg-violet-500/20"
                        title="Quét Camera OCR"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Thẻ thống kê mục tiêu hàng ngày (Daily Learning Goal) & Streak */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Mục tiêu hôm nay</span>
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">14/20 từ</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-1">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full w-[70%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 text-right font-medium">70% hoàn thành</div>
                    </div>

                    <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">
                        <Flame className="w-5 h-5 fill-amber-500 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                          18 ngày streak <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                        </div>
                        <div className="text-[10px] text-slate-400">⭐ 1,420 XP tích lũy</div>
                      </div>
                    </div>
                  </div>

                  {/* Lưới 5 Lối tắt Thao tác nhanh (Quick Action Shortcuts) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Thao tác nhanh</span>
                      <span className="text-[11px] text-indigo-500 font-medium">Tiện ích học tập</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { id: 'search', label: 'Tra từ', icon: Search, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-200/50 dark:border-indigo-500/20', action: () => setActiveTab('search') },
                        { id: 'flashcard', label: 'Ôn SM-2', icon: Layers, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20', action: () => { setStudyMode('flashcard'); setActiveTab('study'); } },
                        { id: 'quiz', label: 'Làm Quiz', icon: HelpCircle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20', action: () => { setStudyMode('quiz'); setActiveTab('study'); } },
                        { id: 'notebook', label: 'Sổ tay', icon: Folder, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10 border-purple-200/50 dark:border-purple-500/20', action: () => setActiveTab('notebook') },
                        { id: 'addword', label: 'Thêm từ', icon: Plus, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10 border-rose-200/50 dark:border-rose-500/20', action: () => setIsAddWordModalOpen(true) }
                      ].map((shortcut) => {
                        const IconComp = shortcut.icon;
                        return (
                          <button
                            key={shortcut.id}
                            onClick={shortcut.action}
                            className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${shortcut.bg}`}
                          >
                            <IconComp className={`w-5 h-5 ${shortcut.color}`} />
                            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                              {shortcut.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Thẻ nổi bật: Từ vựng của ngày (Word of the Day) */}
                  <div
                    onClick={() => openWordDetail(wordOfTheDay)}
                    className="cursor-pointer rounded-3xl p-4 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-lg shadow-indigo-600/25 relative overflow-hidden group"
                  >
                    <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm">
                        <Sparkles className="w-3 h-3 text-amber-300" /> Từ vựng của ngày
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400/20 text-amber-200 border border-amber-300/30">
                          CEFR {wordOfTheDay.cefr}
                        </span>
                        <button
                          onClick={(e) => toggleFavoriteWord(wordOfTheDay.id, e)}
                          className="p-1.5 rounded-full bg-white/15 hover:bg-white/25"
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              wordOfTheDay.isFavorite ? 'fill-amber-300 text-amber-300' : 'text-white'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-1">
                      <div>
                        <h2 className="text-2xl font-extrabold tracking-tight">{wordOfTheDay.word}</h2>
                        <p className="text-xs text-indigo-200 font-mono">{wordOfTheDay.ipa} • {wordOfTheDay.pos}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {['US', 'UK'].map((acc) => (
                          <button
                            key={acc}
                            onClick={(e) => triggerAudio(acc, wordOfTheDay.word, e)}
                            className={`px-2 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all ${
                              playingAudio === `${acc}-${wordOfTheDay.word}`
                                ? 'bg-amber-400 text-slate-900 shadow-md'
                                : 'bg-white/15 text-white hover:bg-white/25'
                            }`}
                          >
                            <Volume2 className="w-3 h-3" />
                            {acc}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-white/90 line-clamp-2 my-2 font-medium leading-relaxed">
                      {wordOfTheDay.meaning}
                    </p>

                    {wordOfTheDay.personalNote && (
                      <div className="mt-2 pt-2 border-t border-white/15 flex items-center gap-1.5 text-[11px] text-amber-200">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span className="truncate">{wordOfTheDay.personalNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Thẻ Hàng đợi ôn tập Spaced Repetition (Daily SRS Due Queue) */}
                  <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200/80 shadow-sm'} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                            Hàng đợi ôn tập SM-2 hôm nay
                          </h4>
                          <p className="text-[10px] text-slate-400">18 thẻ từ vựng đến hạn cần củng cố</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                        18 từ đến hạn
                      </span>
                    </div>

                    {/* Danh sách 3 từ tiêu biểu đến hạn ôn tập */}
                    <div className="space-y-1.5">
                      {[
                        { word: 'Ephemeral', ipa: '/ɪˈfem.ər.əl/', pos: 'Tính từ', ef: '2.5', due: 'Hôm nay' },
                        { word: 'Pragmatic', ipa: '/præɡˈmæt.ɪk/', pos: 'Tính từ', ef: '2.6', due: 'Hôm nay' },
                        { word: 'Ubiquitous', ipa: '/juːˈbɪk.wə.təs/', pos: 'Tính từ', ef: '2.4', due: 'Quá hạn 1 ngày' }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-xl flex items-center justify-between text-xs ${
                            darkMode ? 'bg-slate-700/40' : 'bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 dark:text-slate-200">{item.word}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{item.ipa}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-indigo-500 font-semibold">EF: {item.ef}</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-500 font-bold">
                              {item.due}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setStudyMode('flashcard');
                        setActiveTab('study');
                      }}
                      className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 hover:opacity-95 transition-all"
                    >
                      <Brain className="w-4 h-4" /> Bắt đầu phiên ôn tập Flashcard SM-2
                    </button>
                  </div>

                  {/* Thống kê phân bổ trí nhớ (Memory Retention Stats) */}
                  <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200/80 shadow-sm'} space-y-2.5`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <BarChart2 className="w-4 h-4 text-indigo-500" /> Phân bổ đường cong trí nhớ
                      </span>
                      <button onClick={() => setActiveTab('stats')} className="text-[11px] text-indigo-500 font-semibold hover:underline">
                        Chi tiết &rarr;
                      </button>
                    </div>

                    {/* Thanh tỷ lệ 3 phân đoạn */}
                    <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-700">
                      <div className="bg-sky-500 h-full w-[24%]" title="Thẻ mới: 24%" />
                      <div className="bg-amber-500 h-full w-[48%]" title="Đang củng cố: 48%" />
                      <div className="bg-emerald-500 h-full w-[28%]" title="Ghi nhớ vĩnh viễn: 28%" />
                    </div>

                    {/* Chú thích 3 trạng thái */}
                    <div className="grid grid-cols-3 gap-1 pt-1 text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                        <span className="text-slate-500 dark:text-slate-400">Thẻ mới: 24%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-slate-500 dark:text-slate-400">Đang ôn: 48%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-slate-500 dark:text-slate-400">Đã thuộc: 28%</span>
                      </div>
                    </div>
                  </div>

                  {/* Bộ sưu tập từ vựng gợi ý / Thịnh hành (Trending Vocabulary Decks) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="font-bold text-slate-800 dark:text-slate-100">Bộ từ vựng nổi bật</span>
                      <button onClick={() => setActiveTab('notebook')} className="text-[11px] text-indigo-500 font-medium hover:underline">
                        Xem tất cả sổ tay
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { title: 'IELTS Academic 8.0', count: '250 từ', badge: 'Hot', color: 'from-blue-500 to-indigo-600' },
                        { title: 'Công nghệ & Lập trình IT', count: '180 từ', badge: 'Dev', color: 'from-violet-500 to-purple-600' },
                        { title: 'Thương mại & Giao tiếp', count: '120 từ', badge: 'Pro', color: 'from-emerald-500 to-teal-600' },
                        { title: 'Oxford 3000 từ lõi', count: '500 từ', badge: 'Lõi', color: 'from-amber-500 to-orange-600' }
                      ].map((deck, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveTab('notebook')}
                          className={`p-3 rounded-2xl border cursor-pointer hover:border-indigo-400 transition-all ${
                            darkMode ? 'bg-slate-800/70 border-slate-700/80' : 'bg-white border-slate-200/80 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-indigo-500/10 text-indigo-500">
                              {deck.badge}
                            </span>
                            <span className="text-[10px] text-slate-400">{deck.count}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {deck.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Nhấn để xem từ</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  3b. MÀN HÌNH TRA CỨU TỨC THÌ (SMART DICTIONARY SEARCH)
                 ------------------------------------------------------------- */}
              {activeTab === 'search' && !selectedWord && (
                <div className="p-4 space-y-3.5 animate-fadeIn">
                  {/* Header màn hình Tra cứu: Nút Back về Trang chủ + Tiêu đề + Cặp ngôn ngữ */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('home')}
                        className={`p-2 rounded-xl border transition-colors ${
                          darkMode
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                        }`}
                        title="Về Trang chủ Dashboard"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                          Tra cứu tức thì
                        </h2>
                        <p className="text-[10px] text-slate-400">Từ điển cá nhân đa ngôn ngữ</p>
                      </div>
                    </div>

                    {/* Bộ chọn cặp ngôn ngữ nhỏ gọn */}
                    <div className={`flex items-center gap-1 p-1 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                      {[
                        { code: 'ALL', label: '🌐 Tất cả' },
                        { code: 'EN-VI', label: '🇬🇧 Anh' },
                        { code: 'JA-VI', label: '🇯🇵 Nhật' }
                      ].map((lp) => (
                        <button
                          key={lp.code}
                          onClick={() => setLangPair(lp.code)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                            langPair === lp.code
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-500 hover:text-indigo-600'
                          }`}
                        >
                          {lp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Thanh tìm kiếm tức thì (Instant Search) + Voice + Camera OCR */}
                  <div className="space-y-2">
                    <div
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border transition-all ${
                        darkMode
                          ? 'bg-slate-800/90 border-slate-700 focus-within:border-indigo-500'
                          : 'bg-white border-indigo-100 shadow-md shadow-indigo-500/5 focus-within:border-indigo-500'
                      }`}
                    >
                      <Search className="w-4 h-4 text-indigo-500 shrink-0" />
                      <input
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tra từ vựng, phiên âm IPA, nghĩa tiếng Việt..."
                        className="w-full bg-transparent text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <X className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      )}
                      <button
                        onClick={() => setActiveScannerModal('voice')}
                        className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 transition-colors"
                        title="Tìm kiếm bằng giọng nói"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveScannerModal('ocr')}
                        className="p-1.5 rounded-xl bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 transition-colors"
                        title="Quét Camera OCR dịch nhanh"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bộ lọc từ loại (POS Filters) */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                      {['Tất cả', 'Danh từ', 'Động từ', 'Tính từ', 'Idiom'].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setPosFilter(pos)}
                          className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                            posFilter === pos
                              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                              : darkMode
                              ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              : 'bg-white text-slate-600 border border-slate-200/70 hover:border-indigo-300'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lịch sử tra cứu gần đây (Recent Searches) */}
                  {!searchQuery && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Tra cứu gần đây
                        </span>
                        <span className="text-[10px] text-indigo-500 hover:underline cursor-pointer">
                          Xóa lịch sử
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Serendipity', 'Idempotent', 'Ephemeral', 'Pragmatic', 'Ubiquitous', 'Resilience'].map((historyWord) => (
                          <button
                            key={historyWord}
                            onClick={() => setSearchQuery(historyWord)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                              darkMode
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                                : 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/80 shadow-2xs'
                            }`}
                          >
                            {historyWord}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modal giả lập Voice Search hoặc Camera OCR */}
                  {activeScannerModal && (
                    <div className={`p-4 rounded-2xl border relative overflow-hidden ${darkMode ? 'bg-slate-800 border-indigo-500/40' : 'bg-indigo-50/90 border-indigo-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          {activeScannerModal === 'voice' ? (
                            <>
                              <Mic className="w-4 h-4 animate-pulse text-rose-500" /> Đang nghe giọng nói AI...
                            </>
                          ) : (
                            <>
                              <Camera className="w-4 h-4 text-violet-500" /> Quét văn bản Camera OCR
                            </>
                          )}
                        </span>
                        <button
                          onClick={() => setActiveScannerModal(null)}
                          className="p-1 rounded-lg hover:bg-black/10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-300 mb-3">
                        {activeScannerModal === 'voice'
                          ? 'Hãy phát âm từ tiếng Anh, Nhật hoặc Hàn. Hệ thống tự động nhận diện phiên âm...'
                          : 'Hướng camera vào sách hoặc tài liệu IT để trích xuất từ vựng tức thì...'}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSearchQuery('Serendipity');
                            setActiveScannerModal(null);
                            showToast('Đã nhận diện từ: "Serendipity"');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                        >
                          Thử nhận diện "Serendipity"
                        </button>
                        <button
                          onClick={() => {
                            setSearchQuery('Idempotent');
                            setActiveScannerModal(null);
                            showToast('OCR trích xuất: "Idempotent"');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-semibold"
                        >
                          Quét từ "Idempotent"
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Danh sách kết quả tra cứu (Fast RecyclerView List) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">
                        {searchQuery
                          ? `Kết quả tra cứu (${filteredSearchWords.length})`
                          : `Tất cả từ vựng trong kho (${filteredSearchWords.length})`}
                      </span>
                      <button
                        onClick={() => setIsAddWordModalOpen(true)}
                        className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" /> Thêm từ mới
                      </button>
                    </div>

                    {filteredSearchWords.length === 0 ? (
                      <div className={`p-8 rounded-3xl border text-center space-y-3 ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                          <Search className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          Không tìm thấy từ vựng nào khớp với "{searchQuery}"
                        </p>
                        <button
                          onClick={() => setIsAddWordModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm"
                        >
                          + Thêm từ này vào sổ tay
                        </button>
                      </div>
                    ) : (
                      filteredSearchWords.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => openWordDetail(item)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                            darkMode
                              ? 'bg-slate-800/70 border-slate-800 hover:border-indigo-500/50'
                              : 'bg-white border-slate-200/70 hover:border-indigo-300 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-sm group-hover:text-indigo-500 transition-colors">
                                  {item.word}
                                </h4>
                                <span className="text-[11px] text-slate-400 font-mono">{item.ipa}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-indigo-500/10 text-indigo-500">
                                  {item.pos}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-violet-500/10 text-violet-500">
                                  {item.cefr}
                                </span>
                              </div>
                              <p className={`text-xs mt-1 line-clamp-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                {item.meaning}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => triggerAudio('US', item.word, e)}
                                className={`p-2 rounded-xl transition-colors ${
                                  playingAudio === `US-${item.word}`
                                    ? 'bg-indigo-600 text-white'
                                    : darkMode
                                    ? 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                }`}
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => toggleFavoriteWord(item.id, e)}
                                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                <Bookmark
                                  className={`w-4 h-4 ${
                                    item.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Hiển thị xem trước Ghi chú cá nhân nếu có */}
                          {item.personalNote && (
                            <div className={`mt-2.5 pt-2 border-t flex items-center gap-1.5 text-[11px] ${darkMode ? 'border-slate-700/60 text-indigo-300' : 'border-slate-100 text-indigo-600'}`}>
                              <Edit3 className="w-3 h-3 shrink-0" />
                              <span className="truncate">{item.personalNote}</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}


              {/* -------------------------------------------------------------
                  2. MÀN HÌNH CHI TIẾT TỪ VỰNG (WORD DETAIL SCREEN)
                 ------------------------------------------------------------- */}
              {selectedWord && (
                <div className="p-4 space-y-4 animate-fadeIn">
                  {/* Thanh điều hướng quay lại & Lưu vào thư mục */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedWordId(null)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border ${
                        darkMode
                          ? 'bg-slate-800 border-slate-700 text-slate-200'
                          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Quay lại</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Dropdown chọn nhanh Sổ tay / Thư mục */}
                      <select
                        value={selectedWord.folderId}
                        onChange={(e) => handleChangeWordFolder(selectedWord.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-2 rounded-xl border focus:outline-none ${
                          darkMode
                            ? 'bg-slate-800 border-slate-700 text-indigo-300'
                            : 'bg-white border-slate-200 text-indigo-600 shadow-sm'
                        }`}
                      >
                        {folders.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.icon} {f.name}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={(e) => toggleFavoriteWord(selectedWord.id, e)}
                        className={`p-2 rounded-xl border ${
                          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            selectedWord.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Thẻ Header Chi Tiết Từ Vựng + Sóng âm US/UK */}
                  <div
                    className={`p-4 rounded-3xl border relative overflow-hidden ${
                      darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-indigo-100 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-500">
                        {selectedWord.pos}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/15 text-violet-500">
                        CEFR {selectedWord.cefr}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          selectedWord.status === 'mastered'
                            ? 'bg-emerald-500/15 text-emerald-500'
                            : selectedWord.status === 'learning'
                            ? 'bg-amber-500/15 text-amber-500'
                            : 'bg-blue-500/15 text-blue-500'
                        }`}
                      >
                        {selectedWord.status === 'mastered'
                          ? 'Đã thuộc lòng'
                          : selectedWord.status === 'learning'
                          ? 'Đang học'
                          : 'Mới thêm'}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-tight mb-1">{selectedWord.word}</h2>
                    <p className="text-xs font-mono text-slate-400 mb-3">{selectedWord.ipa}</p>

                    {/* Nút phát âm US / UK giả lập hiệu ứng sóng âm */}
                    <div className="flex items-center gap-2.5">
                      {[
                        { code: 'US', label: '🇺🇸 US Audio', color: 'indigo' },
                        { code: 'UK', label: '🇬🇧 UK Audio', color: 'violet' }
                      ].map((btn) => {
                        const isPlaying = playingAudio === `${btn.code}-${selectedWord.word}`;
                        return (
                          <button
                            key={btn.code}
                            onClick={(e) => triggerAudio(btn.code, selectedWord.word, e)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-2xl text-xs font-bold transition-all ${
                              isPlaying
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                                : darkMode
                                ? 'bg-slate-700/80 text-slate-200 hover:bg-slate-700'
                                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                            }`}
                          >
                            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                            <span>{btn.label}</span>
                            {/* Hiệu ứng sóng âm khi đang phát */}
                            {isPlaying && (
                              <span className="flex items-end gap-0.5 h-3 ml-1">
                                <span className="w-0.5 h-3 bg-white animate-pulse rounded-full" />
                                <span className="w-0.5 h-2 bg-white animate-pulse rounded-full" />
                                <span className="w-0.5 h-3.5 bg-white animate-pulse rounded-full" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4 Tabs Chi tiết: Nghĩa & Ví dụ | Đồng/Trái nghĩa | Ngữ pháp | Ghi chú cá nhân */}
                  <div className={`grid grid-cols-4 gap-1 p-1 rounded-2xl border ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                    {[
                      { id: 'meaning', label: 'Nghĩa & VD' },
                      { id: 'relations', label: 'Đồng/Trái' },
                      { id: 'grammar', label: 'Collocation' },
                      { id: 'notes', label: 'Ghi chú ✨' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setDetailTab(t.id)}
                        className={`py-2 rounded-xl text-[11px] font-bold transition-all ${
                          detailTab === t.id
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : darkMode
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-600 hover:text-indigo-600'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Nội dung Tab 1: Nghĩa & Ví dụ ngữ cảnh */}
                  {detailTab === 'meaning' && (
                    <div className="space-y-3">
                      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'}`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-1.5">
                          Định nghĩa tiếng Việt
                        </h4>
                        <p className="text-sm leading-relaxed font-medium">{selectedWord.meaning}</p>
                      </div>

                      <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/60 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'}`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                          Ví dụ trong ngữ cảnh ({selectedWord.examples.length})
                        </h4>
                        {selectedWord.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border-l-4 border-indigo-500 ${
                              darkMode ? 'bg-slate-900/70' : 'bg-slate-50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs font-semibold leading-relaxed">{ex.en}</p>
                              <button
                                onClick={(e) => triggerAudio('US', ex.en, e)}
                                className="p-1 rounded-lg text-indigo-500 hover:bg-indigo-500/10 shrink-0"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{ex.vi}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nội dung Tab 2: Từ đồng nghĩa & Trái nghĩa */}
                  {detailTab === 'relations' && (
                    <div className="space-y-3">
                      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'}`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
                          Từ đồng nghĩa (Synonyms)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedWord.synonyms.map((syn, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            >
                              {syn}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'}`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
                          Từ trái nghĩa (Antonyms)
                        </h4>
                        {selectedWord.antonyms.length === 0 ? (
                          <p className="text-xs text-slate-400">Chưa có từ trái nghĩa trực tiếp.</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {selectedWord.antonyms.map((ant, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20"
                              >
                                {ant}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nội dung Tab 3: Ngữ pháp & Collocations */}
                  {detailTab === 'grammar' && (
                    <div className="space-y-3">
                      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'}`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-violet-500 mb-2">
                          Cụm từ cố định (Collocations)
                        </h4>
                        <ul className="space-y-2">
                          {selectedWord.collocations.map((col, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs font-medium">
                              <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                              <span>{col}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/60 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'}`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1.5">
                          Lưu ý Ngữ pháp & Cách dùng
                        </h4>
                        <p className="text-xs leading-relaxed">{selectedWord.grammarNote}</p>
                      </div>
                    </div>
                  )}

                  {/* Nội dung Tab 4: Ghi chú cá nhân (Personal Notes / Mnemonics) */}
                  {detailTab === 'notes' && (
                    <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-indigo-500/30' : 'bg-indigo-50/50 border-indigo-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Brain className="w-4 h-4 text-indigo-500" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                            Mẹo nhớ từ & Ghi chú của riêng bạn
                          </h4>
                        </div>
                        {!isEditingNote && (
                          <button
                            onClick={() => setIsEditingNote(true)}
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Sửa ghi chú
                          </button>
                        )}
                      </div>

                      {isEditingNote ? (
                        <div className="space-y-2.5">
                          <textarea
                            rows={4}
                            value={editingNoteText}
                            onChange={(e) => setEditingNoteText(e.target.value)}
                            placeholder="Nhập liên tưởng cá nhân, câu chuyện vui hoặc ngữ cảnh gặp từ này..."
                            className={`w-full p-3 rounded-xl text-xs border focus:outline-none ${
                              darkMode
                                ? 'bg-slate-900 border-slate-700 text-slate-100'
                                : 'bg-white border-indigo-200 text-slate-800'
                            }`}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingNoteText(selectedWord.personalNote || '');
                                setIsEditingNote(false);
                              }}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-700"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleSavePersonalNote}
                              className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-sm"
                            >
                              Lưu ghi chú
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => setIsEditingNote(true)}
                          className={`p-3.5 rounded-xl border cursor-pointer ${
                            darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-indigo-100'
                          }`}
                        >
                          <p className="text-xs leading-relaxed">
                            {selectedWord.personalNote || 'Bấm vào đây để thêm mẹo ghi nhớ cá nhân (Mnemonics)...'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Nút chuyển nhanh sang Ôn tập Flashcard cho từ này */}
                  <button
                    onClick={() => {
                      const idx = words.findIndex((w) => w.id === selectedWord.id);
                      if (idx !== -1) setCurrentCardIndex(idx);
                      setSelectedWordId(null);
                      setActiveTab('study');
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Luyện tập Flashcard 3D với từ "{selectedWord.word}"</span>
                  </button>
                </div>
              )}

              {/* -------------------------------------------------------------
                  3. MÀN HÌNH SỔ TAY CÁ NHÂN & BỘ SƯU TẬP (PERSONAL COLLECTIONS)
                 ------------------------------------------------------------- */}
              {activeTab === 'notebook' && !selectedWord && (
                <div className="p-4 space-y-4">
                  {/* Header Sổ tay + Nút thêm từ mới */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold tracking-tight">Sổ Tay Cá Nhân</h2>
                      <p className="text-xs text-slate-400">
                        Quản lý bộ sưu tập từ vựng & ghi chú của riêng bạn
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddWordModalOpen(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-md shadow-indigo-500/25"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm từ mới</span>
                    </button>
                  </div>

                  {/* Grid 4 Thư mục từ vựng tự tạo */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {folders.map((folder) => {
                      const count = words.filter((w) => w.folderId === folder.id).length;
                      const isSelected = selectedFolderFilter === folder.id;
                      return (
                        <div
                          key={folder.id}
                          onClick={() =>
                            setSelectedFolderFilter(isSelected ? 'ALL' : folder.id)
                          }
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
                            isSelected
                              ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-500/10'
                              : darkMode
                              ? 'bg-slate-800/80 border-slate-800 hover:border-slate-700'
                              : 'bg-white border-slate-200/80 hover:border-indigo-200 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{folder.icon}</span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                              {count} từ
                            </span>
                          </div>
                          <h3 className="font-bold text-xs truncate">{folder.name}</h3>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {folder.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bộ lọc theo Trạng thái học: Tất cả | Mới thêm | Đang học | Đã thuộc lòng */}
                  <div className="flex items-center justify-between gap-1 pt-1">
                    {[
                      { id: 'ALL', label: `Tất cả (${words.length})` },
                      { id: 'new', label: `Mới (${statsSummary.newCount})` },
                      { id: 'learning', label: `Đang học (${statsSummary.learningCount})` },
                      { id: 'mastered', label: `Thuộc lòng (${statsSummary.masteredCount})` }
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setStatusFilter(st.id)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all ${
                          statusFilter === st.id
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : darkMode
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-white text-slate-600 border border-slate-200/70'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {/* Danh sách từ trong bộ sưu tập đang chọn */}
                  <div className="space-y-2.5">
                    {selectedFolderFilter !== 'ALL' && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Đang lọc thư mục:{' '}
                          <strong className="text-indigo-500">
                            {folders.find((f) => f.id === selectedFolderFilter)?.name}
                          </strong>
                        </span>
                        <button
                          onClick={() => setSelectedFolderFilter('ALL')}
                          className="text-indigo-500 font-semibold hover:underline"
                        >
                          Xem tất cả
                        </button>
                      </div>
                    )}

                    {notebookWords.map((w) => (
                      <div
                        key={w.id}
                        onClick={() => openWordDetail(w)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          darkMode
                            ? 'bg-slate-800/70 border-slate-800 hover:border-indigo-500/40'
                            : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm">{w.word}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 font-semibold">
                              {w.pos}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              w.status === 'mastered'
                                ? 'bg-emerald-500/15 text-emerald-500'
                                : w.status === 'learning'
                                ? 'bg-amber-500/15 text-amber-500'
                                : 'bg-blue-500/15 text-blue-500'
                            }`}
                          >
                            {w.status === 'mastered'
                              ? '✓ Đã thuộc'
                              : w.status === 'learning'
                              ? '⏳ Đang học'
                              : '★ Mới thêm'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-1">
                          {w.meaning}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50 text-[10px] text-slate-400">
                          <span>
                            {folders.find((f) => f.id === w.folderId)?.icon}{' '}
                            {folders.find((f) => f.id === w.folderId)?.name}
                          </span>
                          <span>Lặp lại SRS: {w.nextReview}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  4. MÀN HÌNH ÔN TẬP FLASHCARD 3D & SPACED REPETITION (SM-2)
                 ------------------------------------------------------------- */}
              {activeTab === 'study' && !selectedWord && (
                <div className="p-4 space-y-4">
                  {/* Header: Chuyển đổi Flashcard 3D / Trắc nghiệm Quiz */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold tracking-tight">Ôn Tập Thông Minh</h2>
                      <p className="text-xs text-slate-400">
                        Thuật toán lặp lại ngắt quãng SM-2 • Thẻ {(currentCardIndex % words.length) + 1}/{words.length}
                      </p>
                    </div>

                    <div className={`flex p-1 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                      <button
                        onClick={() => setStudyMode('flashcard')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          studyMode === 'flashcard'
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400'
                        }`}
                      >
                        Flashcard 3D
                      </button>
                      <button
                        onClick={() => setStudyMode('quiz')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          studyMode === 'quiz'
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400'
                        }`}
                      >
                        Quiz Nhanh
                      </button>
                    </div>
                  </div>

                  {/* Thanh tiến độ phiên ôn tập */}
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                      style={{ width: `${(((currentCardIndex % words.length) + 1) / words.length) * 100}%` }}
                    />
                  </div>

                  {studyMode === 'flashcard' ? (
                    <>
                      {/* Thẻ Flashcard Tương Tác Lật Mặt Trước / Mặt Sau */}
                      <div
                        onClick={() => setIsCardFlipped(!isCardFlipped)}
                        className={`min-h-[340px] rounded-3xl p-6 border flex flex-col justify-between cursor-pointer transition-all duration-300 select-none relative overflow-hidden ${
                          isCardFlipped
                            ? darkMode
                              ? 'bg-gradient-to-br from-slate-800 to-indigo-950/80 border-indigo-500/50 shadow-xl'
                              : 'bg-gradient-to-br from-indigo-50 via-white to-violet-50 border-indigo-300 shadow-xl'
                            : darkMode
                            ? 'bg-slate-800/90 border-slate-700 shadow-xl'
                            : 'bg-white border-slate-200/90 shadow-xl shadow-indigo-500/5'
                        }`}
                      >
                        {/* Nhãn góc trên của thẻ */}
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500">
                            {isCardFlipped ? 'Mặt sau • Nghĩa & Ghi chú' : 'Mặt trước • Từ vựng'}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-violet-500">
                              {currentStudyWord.cefr}
                            </span>
                            <button
                              onClick={(e) => triggerAudio('US', currentStudyWord.word, e)}
                              className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Nội dung chính giữa thẻ */}
                        {!isCardFlipped ? (
                          <div className="text-center my-auto py-6 space-y-2">
                            <span className="text-xs font-semibold text-indigo-500">
                              {currentStudyWord.pos}
                            </span>
                            <h3 className="text-3xl font-extrabold tracking-tight">
                              {currentStudyWord.word}
                            </h3>
                            <p className="text-xs font-mono text-slate-400">{currentStudyWord.ipa}</p>
                            <p className="text-[11px] text-slate-400 pt-3">
                              Chạm vào thẻ để lật xem nghĩa & ghi chú ↺
                            </p>
                          </div>
                        ) : (
                          <div className="my-auto py-4 space-y-3">
                            <div>
                              <h3 className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                                {currentStudyWord.meaning}
                              </h3>
                              <p className="text-xs text-slate-400 mt-1 italic">
                                "{currentStudyWord.examples[0]?.en}"
                              </p>
                            </div>
                            {currentStudyWord.personalNote && (
                              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                                <strong>💡 Mẹo nhớ:</strong> {currentStudyWord.personalNote}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                          Thuật toán SM-2 • Ôn tập ngắt quãng
                        </div>
                      </div>

                      {/* Nút đánh giá SM-2 (Quên / Khó / Tốt / Dễ) */}
                      <div className="space-y-1.5 pt-1">
                        <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Mức độ ghi nhớ của bạn (SM-2)
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: 'Quên', time: '10 phút', color: 'rose', status: 'new' },
                            { label: 'Khó', time: '1 ngày', color: 'amber', status: 'learning' },
                            { label: 'Tốt', time: '3 ngày', color: 'blue', status: 'learning' },
                            { label: 'Dễ', time: '7 ngày', color: 'emerald', status: 'mastered' }
                          ].map((grade) => (
                            <button
                              key={grade.label}
                              onClick={() => handleSrsGrade(grade.label, grade.time, grade.status)}
                              className={`py-2.5 px-1 rounded-2xl border text-center font-bold text-xs transition-transform active:scale-95 ${
                                grade.color === 'rose'
                                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                                  : grade.color === 'amber'
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                                  : grade.color === 'blue'
                                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-500'
                                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                              }`}
                            >
                              <p className="font-extrabold">{grade.label}</p>
                              <span className="text-[10px] opacity-80">{grade.time}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Chế độ Trắc nghiệm Quiz 4 đáp án */
                    <div className={`p-4 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200 shadow-md'}`}>
                      <div className="text-center space-y-1">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500">
                          Trắc nghiệm Quiz • Điểm: {quizScore}
                        </span>
                        <h3 className="text-2xl font-extrabold pt-1">{currentStudyWord.word}</h3>
                        <p className="text-xs text-slate-400 font-mono">{currentStudyWord.ipa}</p>
                      </div>

                      <div className="space-y-2">
                        {quizOptions.map((opt) => {
                          const isSelected = quizSelectedOption === opt.id;
                          const isCorrect = opt.id === currentStudyWord.id;
                          let btnStyle = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200';
                          if (quizSelectedOption) {
                            if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold';
                            else if (isSelected) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-300';
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectQuizOption(opt)}
                              disabled={quizSelectedOption !== null}
                              className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span className="font-medium">{opt.meaning}</span>
                              {quizSelectedOption && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSelectedOption && (
                        <button
                          onClick={nextQuizQuestion}
                          className="w-full py-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5"
                        >
                          <span>Câu hỏi tiếp theo</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              
              {/* -------------------------------------------------------------
                  5. MÀN HÌNH THỐNG KÊ & PHÂN TÍCH HỌC TẬP (STATS & ANALYTICS)
                 ------------------------------------------------------------- */}
              {activeTab === 'stats' && !selectedWord && (
                <div className="p-4 space-y-4">
                  <div>
                    <h2 className="text-lg font-extrabold tracking-tight">Thống Kê Học Tập</h2>
                    <p className="text-xs text-slate-400">
                      Theo dõi chuỗi ngày học liên tiếp & mức độ ghi nhớ từ vựng
                    </p>
                  </div>

                  {/* Thẻ Day Streak & Mục tiêu ngày */}
                  <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                        Chuỗi học tập liên tục
                      </span>
                      <div className="flex items-baseline gap-2 pt-1">
                        <h3 className="text-3xl font-extrabold">18 Ngày</h3>
                        <span className="text-xs text-amber-100">Kỷ lục: 24 ngày</span>
                      </div>
                      <p className="text-xs text-amber-50">
                        Hôm nay bạn đã ôn tập {reviewedTodayCount}/{dailyGoal} từ vựng!
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Flame className="w-9 h-9 text-amber-200 fill-amber-200" />
                    </div>
                  </div>

                  {/* Tỷ lệ phân bổ mức độ ghi nhớ (Mới, Đang nhớ, Thuộc lòng) */}
                  <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Phân bổ trí nhớ từ vựng ({statsSummary.total} từ)
                    </h3>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-lg font-extrabold text-blue-500">{statsSummary.newCount}</p>
                        <p className="text-[11px] font-semibold text-blue-500">Mới thêm</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                        <p className="text-lg font-extrabold text-amber-500">{statsSummary.learningCount}</p>
                        <p className="text-[11px] font-semibold text-amber-500">Đang nhớ</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <p className="text-lg font-extrabold text-emerald-500">{statsSummary.masteredCount}</p>
                        <p className="text-[11px] font-semibold text-emerald-500">Thuộc lòng</p>
                      </div>
                    </div>

                    {/* Thanh tỷ lệ trực quan */}
                    <div className="w-full h-3 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${(statsSummary.newCount / statsSummary.total) * 100}%` }}
                        className="bg-blue-500 h-full"
                      />
                      <div
                        style={{ width: `${(statsSummary.learningCount / statsSummary.total) * 100}%` }}
                        className="bg-amber-500 h-full"
                      />
                      <div
                        style={{ width: `${(statsSummary.masteredCount / statsSummary.total) * 100}%` }}
                        className="bg-emerald-500 h-full"
                      />
                    </div>
                  </div>

                  {/* Biểu đồ số từ đã thuộc theo tuần (T2 -> CN) */}
                  <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Số từ ôn tập trong tuần
                      </h3>
                      <span className="text-xs font-bold text-indigo-500">Tổng: 112 từ</span>
                    </div>

                    <div className="h-36 flex items-end justify-between gap-2 pt-4 px-1">
                      {[
                        { day: 'T2', val: 15, pct: '55%' },
                        { day: 'T3', val: 22, pct: '80%' },
                        { day: 'T4', val: 12, pct: '45%' },
                        { day: 'T5', val: 25, pct: '95%' },
                        { day: 'T6', val: 18, pct: '68%' },
                        { day: 'T7', val: 20, pct: '75%' },
                        { day: 'CN', val: reviewedTodayCount, pct: `${Math.min(100, (reviewedTodayCount / 26) * 100)}%`, active: true }
                      ].map((bar) => (
                        <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <span className="text-[10px] font-bold text-slate-400">{bar.val}</span>
                          <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-t-xl h-24 flex items-end overflow-hidden">
                            <div
                              style={{ height: bar.pct }}
                              className={`w-full rounded-t-xl transition-all duration-500 ${
                                bar.active
                                  ? 'bg-gradient-to-t from-indigo-600 to-violet-500'
                                  : 'bg-indigo-500/40'
                              }`}
                            />
                          </div>
                          <span className={`text-[10px] font-bold ${bar.active ? 'text-indigo-500' : 'text-slate-400'}`}>
                            {bar.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  10. MÀN HÌNH HỒ SƠ CÁ NHÂN, CÀI ĐẶT & ĐĂNG XUẤT (PROFILE & LOGOUT)
                 ------------------------------------------------------------- */}

              {/* -------------------------------------------------------------
                  6. MÀN HÌNH HỒ SƠ CÁ NHÂN, CÀI ĐẶT & ĐĂNG XUẤT (PROFILE & LOGOUT)
                 ------------------------------------------------------------- */}
              {activeTab === 'profile' && !selectedWord && (
                <div className="p-4 space-y-4 animate-fadeIn">
                  {/* Header Hồ sơ */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold tracking-tight">Tài Khoản & Cài Đặt</h2>
                      <p className="text-xs text-slate-400">
                        Quản lý đồng bộ dữ liệu, giọng đọc & bảo mật tài khoản
                      </p>
                    </div>
                    <button
                      onClick={() => setDrawerOpen(true)}
                      className={`p-2 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}
                    >
                      <Menu className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thẻ Thông tin User + Trạng thái Cloud Sync */}
                  <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shadow-inner">
                        {userProfile.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-base truncate">{userProfile.fullName}</h3>
                          <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                        </div>
                        <p className="text-xs text-indigo-100 truncate">{userProfile.email}</p>
                        <p className="text-[11px] text-amber-200 font-semibold mt-0.5">{userProfile.role}</p>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-indigo-100">
                        <Cloud className="w-4 h-4 text-emerald-300" />
                        <span>{userProfile.lastSync}</span>
                      </div>
                      <button
                        onClick={() => {
                          setUserProfile((p) => ({ ...p, lastSync: 'Vừa đồng bộ tức thì ✓' }));
                          showToast('Đã đồng bộ 8 từ vựng và tiến độ SM-2 lên Cloud!');
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 font-bold text-[11px] flex items-center gap-1 transition-all"
                      >
                        <RefreshCw className="w-3 h-3" /> Đồng bộ ngay
                      </button>
                    </div>
                  </div>

                  {/* Nhóm cài đặt Học tập & Phát âm */}
                  <div className={`p-3.5 rounded-2xl border space-y-2.5 ${darkMode ? 'bg-slate-800/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      Tùy chỉnh học tập & Âm thanh (TTS)
                    </h4>

                    {/* Chọn giọng phát âm mặc định */}
                    <div className="flex items-center justify-between px-1 py-1 text-xs">
                      <div className="flex items-center gap-2.5">
                        <Volume2 className="w-4 h-4 text-indigo-500" />
                        <div>
                          <p className="font-bold">Giọng phát âm mặc định</p>
                          <p className="text-[10px] text-slate-400">TextToSpeech Engine (Android)</p>
                        </div>
                      </div>
                      <div className={`flex p-0.5 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                        {['US', 'UK'].map((acc) => (
                          <button
                            key={acc}
                            onClick={() => {
                              setUserProfile((p) => ({ ...p, defaultAccent: acc }));
                              showToast(`Đã đổi giọng đọc mặc định sang tiếng Anh - ${acc}`);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                              userProfile.defaultAccent === acc
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-400'
                            }`}
                          >
                            {acc === 'US' ? '🇺🇸 US' : '🇬🇧 UK'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Nhắc nhở học tập */}
                    <div className="flex items-center justify-between px-1 py-1 text-xs border-t border-slate-100 dark:border-slate-700/60 pt-2.5">
                      <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-amber-500" />
                        <div>
                          <p className="font-bold">Thông báo nhắc ôn tập SM-2</p>
                          <p className="text-[10px] text-slate-400">Hàng ngày lúc 20:30 (AlarmManager)</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setReminderEnabled(!reminderEnabled);
                          showToast(!reminderEnabled ? 'Đã bật thông báo nhắc học' : 'Đã tắt thông báo nhắc học');
                        }}
                        className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                          reminderEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${reminderEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Sao lưu dữ liệu SQLite / CSV */}
                    <div className="flex items-center justify-between px-1 py-1 text-xs border-t border-slate-100 dark:border-slate-700/60 pt-2.5">
                      <div className="flex items-center gap-2.5">
                        <Database className="w-4 h-4 text-emerald-500" />
                        <div>
                          <p className="font-bold">Sao lưu & Xuất từ điển (.CSV / .JSON)</p>
                          <p className="text-[10px] text-slate-400">Dung lượng SQLite: 2.4 MB ({words.length} từ)</p>
                        </div>
                      </div>
                      <button
                        onClick={() => showToast('Đã xuất file cassavas_lexicon_export.csv về máy!')}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold text-[11px] hover:bg-emerald-500/20"
                      >
                        Xuất file
                      </button>
                    </div>
                  </div>

                  {/* Nhóm Bảo mật & Tài khoản (Đổi mật khẩu + Đăng xuất) */}
                  <div className={`p-3.5 rounded-2xl border space-y-2.5 ${darkMode ? 'bg-slate-800/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      Bảo mật & Phiên đăng nhập
                    </h4>

                    <button
                      onClick={() => setChangePasswordModal(true)}
                      className="w-full flex items-center justify-between px-1 py-1.5 text-xs font-bold hover:text-indigo-500 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <KeyRound className="w-4 h-4 text-violet-500" />
                        <span>Đổi mật khẩu tài khoản</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <button
                        onClick={() => setLogoutConfirmModal(true)}
                        className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng Xuất Khỏi Thiết Bị</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  7. MÀN HÌNH QUẢN TRỊ HỆ THỐNG (ADMIN CMS)
                 ------------------------------------------------------------- */}
{activeTab === 'admin' && !selectedWord && (
                <div className="p-4 space-y-4 animate-fadeIn">
                  {/* Header Admin CMS */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-base font-extrabold tracking-tight">Quản Trị Hệ Thống</h2>
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                            ADMIN CMS
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Kiểm duyệt từ điển, Quản lý học viên & Bộ từ mẫu
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setLogoutConfirmModal(true)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20"
                      title="Đăng xuất Admin"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 4 Thẻ KPI Tổng quan Hệ thống */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Tổng Học Viên</span>
                        <Users className="w-4 h-4 text-indigo-500" />
                      </div>
                      <p className="text-xl font-extrabold">1,248</p>
                      <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">
                        +34 học viên tuần này
                      </p>
                    </div>

                    <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white border-slate-200/80 shadow-sm'}`}>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Kho Từ Hệ Thống</span>
                        <Database className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-xl font-extrabold">{15412 + words.length}</p>
                      <p className="text-[10px] text-indigo-500 font-semibold mt-0.5">
                        Đồng bộ SQLite Master
                      </p>
                    </div>

                    <div
                      onClick={() => setAdminSubTab('moderation')}
                      className={`p-3 rounded-2xl border cursor-pointer ${darkMode ? 'bg-slate-800/90 border-amber-500/40' : 'bg-amber-50/60 border-amber-200 shadow-sm'}`}
                    >
                      <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 mb-1">
                        <span className="font-bold">Từ Chờ Duyệt</span>
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <p className="text-xl font-extrabold text-amber-500">
                        {pendingContributions.length} từ
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Đóng góp từ cộng đồng
                      </p>
                    </div>

                    <div
                      onClick={() => setAdminSubTab('decks')}
                      className={`p-3 rounded-2xl border cursor-pointer ${darkMode ? 'bg-slate-800/90 border-rose-500/40' : 'bg-rose-50/60 border-rose-200 shadow-sm'}`}
                    >
                      <div className="flex items-center justify-between text-xs text-rose-500 mb-1">
                        <span className="font-bold">Báo Lỗi Từ Vựng</span>
                        <Flag className="w-4 h-4" />
                      </div>
                      <p className="text-xl font-extrabold text-rose-500">
                        {bugReports.filter((b) => b.status === 'open').length} lỗi
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Cần kiểm tra phiên âm/nghĩa
                      </p>
                    </div>
                  </div>

                  {/* 3 Sub-Tabs Nghiệp vụ Quản trị Admin */}
                  <div className={`grid grid-cols-3 gap-1 p-1 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200/70 border-slate-200'}`}>
                    {[
                      { id: 'moderation', label: `Duyệt từ (${pendingContributions.length})` },
                      { id: 'users', label: `Học viên (${managedUsers.length})` },
                      { id: 'decks', label: 'Bộ từ & Báo lỗi' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setAdminSubTab(st.id)}
                        className={`py-2 rounded-xl text-[11px] font-extrabold transition-all ${
                          adminSubTab === st.id
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm'
                            : darkMode
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB-TAB 1: DUYỆT TỪ ĐÓNG GÓP & QUẢN LÝ KHO TỪ HỆ THỐNG */}
                  {adminSubTab === 'moderation' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                          Đóng góp chờ phê duyệt ({pendingContributions.length})
                        </h3>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => showToast('Admin: Đã Import 250 từ vựng chuẩn từ file Excel/CSV!')}
                            className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-500 text-[11px] font-bold flex items-center gap-1"
                          >
                            <Upload className="w-3 h-3" /> Import CSV
                          </button>
                          <button
                            onClick={() => setIsAddWordModalOpen(true)}
                            className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white text-[11px] font-bold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Thêm từ chuẩn
                          </button>
                        </div>
                      </div>

                      {pendingContributions.length === 0 ? (
                        <div className={`p-5 rounded-2xl border text-center ${darkMode ? 'bg-slate-800/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
                          <p className="text-xs font-bold">Đã duyệt sạch toàn bộ từ vựng đóng góp!</p>
                        </div>
                      ) : (
                        pendingContributions.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3.5 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/90 shadow-sm'}`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-extrabold text-sm text-indigo-500">{item.word}</h4>
                                  <span className="text-[11px] font-mono text-slate-400">{item.ipa}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-amber-500/15 text-amber-500">
                                    {item.pos} • {item.cefr}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  Đóng góp bởi: <strong>{item.contributor}</strong> • {item.submittedAt}
                                </p>
                              </div>
                            </div>

                            <p className="text-xs leading-relaxed">{item.meaning}</p>

                            {item.personalNote && (
                              <p className="text-[11px] text-indigo-400 bg-indigo-500/10 px-2.5 py-1.5 rounded-xl">
                                💡 Gợi ý Mnemonic: {item.personalNote}
                              </p>
                            )}

                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() => handleApproveContribution(item)}
                                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" /> Duyệt vào Hệ thống
                              </button>
                              <button
                                onClick={() => handleRejectContribution(item.id, item.word)}
                                className="px-3 py-2 rounded-xl bg-rose-500/15 text-rose-500 hover:bg-rose-500 hover:text-white text-xs font-bold transition-colors"
                              >
                                Từ chối
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* SUB-TAB 2: QUẢN LÝ NGƯỜI DÙNG & PHÂN QUYỀN (USER MANAGEMENT) */}
                  {adminSubTab === 'users' && (
                    <div className="space-y-3">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={userSearchQuery}
                          onChange={(e) => setUserSearchQuery(e.target.value)}
                          placeholder="Tìm học viên theo tên hoặc email..."
                          className="w-full bg-transparent text-xs focus:outline-none"
                        />
                      </div>

                      {managedUsers
                        .filter(
                          (u) =>
                            u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                            u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
                        )
                        .map((u) => (
                          <div
                            key={u.id}
                            className={`p-3.5 rounded-2xl border space-y-2.5 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/90 shadow-sm'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-bold text-xs">{u.fullName}</h4>
                                  <span
                                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                                      u.role === 'ADMIN'
                                        ? 'bg-amber-500/20 text-amber-500'
                                        : 'bg-indigo-500/15 text-indigo-500'
                                    }`}
                                  >
                                    {u.role}
                                  </span>
                                  <span
                                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                      u.status === 'active'
                                        ? 'bg-emerald-500/15 text-emerald-500'
                                        : 'bg-rose-500/15 text-rose-500'
                                    }`}
                                  >
                                    {u.status === 'active' ? '● Hoạt động' : '🔒 Đã khóa'}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400">{u.email}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 dark:border-slate-700/60">
                              <span className="text-slate-400">
                                📚 <strong>{u.wordsCount}</strong> từ • 🔥 Streak <strong>{u.streak}</strong> ngày
                              </span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => handleToggleUserRole(u.id)}
                                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold"
                                >
                                  Đổi Role
                                </button>
                                <button
                                  onClick={() => handleToggleUserStatus(u.id)}
                                  className={`px-2.5 py-1 rounded-lg font-bold ${
                                    u.status === 'active'
                                      ? 'bg-rose-500/15 text-rose-500'
                                      : 'bg-emerald-500/15 text-emerald-500'
                                  }`}
                                >
                                  {u.status === 'active' ? 'Khóa TK' : 'Mở khóa'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* SUB-TAB 3: BỘ TỪ VỰNG MẪU HỆ THỐNG & XỬ LÝ BÁO LỖI */}
                  {adminSubTab === 'decks' && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                        Phát hành Bộ từ mẫu cho toàn bộ Học viên
                      </h3>
                      {systemDecks.map((deck) => (
                        <div
                          key={deck.id}
                          className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}
                        >
                          <div>
                            <h4 className="font-bold text-xs">{deck.title}</h4>
                            <p className="text-[10px] text-slate-400">
                              {deck.category} • {deck.wordCount} từ • {deck.downloads} lượt tải
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSystemDecks((prev) =>
                                prev.map((d) =>
                                  d.id === deck.id ? { ...d, published: !d.published } : d
                                )
                              );
                              showToast(
                                !deck.published
                                  ? `Đã phát hành công khai bộ "${deck.title}"`
                                  : `Đã tạm ẩn bộ "${deck.title}"`
                              );
                            }}
                            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold shrink-0 ${
                              deck.published
                                ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                            }`}
                          >
                            {deck.published ? '✓ Đang phát hành' : 'Bản nháp (Ẩn)'}
                          </button>
                        </div>
                      ))}

                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-500 pt-2">
                        Báo lỗi Nội dung từ Học viên ({bugReports.length})
                      </h3>
                      {bugReports.map((bug) => (
                        <div
                          key={bug.id}
                          className={`p-3 rounded-2xl border space-y-1.5 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-rose-500">
                              Từ vựng: {bug.word}
                            </span>
                            <button
                              onClick={() => {
                                setBugReports((prev) =>
                                  prev.map((b) =>
                                    b.id === bug.id
                                      ? { ...b, status: b.status === 'open' ? 'resolved' : 'open' }
                                      : b
                                  )
                                );
                                showToast(`Admin: Đã cập nhật trạng thái xử lý lỗi từ "${bug.word}"`);
                              }}
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                bug.status === 'resolved'
                                  ? 'bg-emerald-500/15 text-emerald-500'
                                  : 'bg-amber-500/15 text-amber-500'
                              }`}
                            >
                              {bug.status === 'resolved' ? '✓ Đã sửa lỗi' : '⏳ Chờ xử lý (Bấm để duyệt)'}
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-300">{bug.issue}</p>
                          <p className="text-[10px] text-slate-400">Người báo: {bug.reporter}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ===============================================================
                MODAL KHÔI PHỤC MẬT KHẨU (FORGOT PASSWORD MODAL)
               =============================================================== */}
            {forgotPasswordModal && (
              <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5">
                <div className={`w-full rounded-3xl p-5 space-y-3.5 border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm">Khôi phục mật khẩu</h3>
                    </div>
                    <button onClick={() => setForgotPasswordModal(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nhập địa chỉ Email đã đăng ký. Hệ thống sẽ gửi mã OTP 6 số để đặt lại mật khẩu mới.
                  </p>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setForgotPasswordModal(false)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        setForgotPasswordModal(false);
                        showToast(`Đã gửi mã OTP khôi phục tới ${resetEmail}`);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white"
                    >
                      Gửi mã OTP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                MODAL ĐỔI MẬT KHẨU (CHANGE PASSWORD MODAL)
               =============================================================== */}
            {changePasswordModal && (
              <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5">
                <div className={`w-full rounded-3xl p-5 space-y-3 border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm">Đổi mật khẩu bảo mật</h3>
                    <button onClick={() => setChangePasswordModal(false)} className="p-1 rounded-lg">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="Mật khẩu hiện tại"
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <input
                    type="password"
                    placeholder="Mật khẩu mới (tối thiểu 8 ký tự)"
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setChangePasswordModal(false)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800"
                    >
                      Đóng
                    </button>
                    <button
                      onClick={() => {
                        setChangePasswordModal(false);
                        showToast('Cập nhật mật khẩu mới thành công!');
                      }}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                HỘP THOẠI XÁC NHẬN ĐĂNG XUẤT (LOGOUT CONFIRMATION DIALOG)
               =============================================================== */}
            {logoutConfirmModal && (
              <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5">
                <div className={`w-full rounded-3xl p-5 space-y-3.5 border shadow-2xl text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto">
                    <LogOut className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm">Xác nhận Đăng xuất?</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dữ liệu từ điển cá nhân và tiến độ ôn tập SM-2 trên <strong className="text-indigo-500">SQLite cục bộ</strong> vẫn được giữ an toàn trên thiết bị của bạn.
                    </p>
                  </div>
                  <div className="flex gap-2.5 pt-1">
                    <button
                      onClick={() => setLogoutConfirmModal(false)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800"
                    >
                      Ở lại
                    </button>
                    <button
                      onClick={handleConfirmLogout}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/25"
                    >
                      Đăng xuất ngay
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                MODAL THÊM TỪ VỰNG CÁ NHÂN MỚI (CUSTOM WORD FORM MODAL)
               =============================================================== */}
            {isAddWordModalOpen && (
              <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-end justify-center">
                <div
                  className={`w-full max-h-[88%] rounded-t-3xl p-5 overflow-y-auto space-y-3.5 animate-slideUp ${
                    darkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between border-b pb-2.5 border-slate-200 dark:border-slate-800">
                    <div>
                      <h3 className="font-extrabold text-sm">Thêm Từ Vựng Cá Nhân Mới</h3>
                      <p className="text-[11px] text-slate-400">
                        Tự biên soạn từ vựng, nghĩa & mẹo nhớ vào sổ tay
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddWordModalOpen(false)}
                      className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddNewCustomWord} className="space-y-3 text-xs">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="font-bold block mb-1">Từ vựng / Cụm từ *</label>
                        <input
                          type="text"
                          required
                          placeholder="VD: Ephemeral"
                          value={newWordForm.word}
                          onChange={(e) => setNewWordForm({ ...newWordForm, word: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Phiên âm IPA</label>
                        <input
                          type="text"
                          placeholder="/ɪˈfem.ər.əl/"
                          value={newWordForm.ipa}
                          onChange={(e) => setNewWordForm({ ...newWordForm, ipa: e.target.value })}
                          className={`w-full px-2.5 py-2 rounded-xl border focus:outline-none ${
                            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="font-bold block mb-1">Từ loại</label>
                        <select
                          value={newWordForm.pos}
                          onChange={(e) => setNewWordForm({ ...newWordForm, pos: e.target.value })}
                          className={`w-full px-2 py-2 rounded-xl border ${
                            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <option>Danh từ</option>
                          <option>Động từ</option>
                          <option>Tính từ</option>
                          <option>Idiom</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Cấp CEFR</label>
                        <select
                          value={newWordForm.cefr}
                          onChange={(e) => setNewWordForm({ ...newWordForm, cefr: e.target.value })}
                          className={`w-full px-2 py-2 rounded-xl border ${
                            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <option>A2</option>
                          <option>B1</option>
                          <option>B2</option>
                          <option>C1</option>
                          <option>C2</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Bộ sưu tập</label>
                        <select
                          value={newWordForm.folderId}
                          onChange={(e) => setNewWordForm({ ...newWordForm, folderId: e.target.value })}
                          className={`w-full px-2 py-2 rounded-xl border ${
                            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          {folders.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold block mb-1">Nghĩa tiếng Việt *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Nhập giải nghĩa chi tiết theo cách hiểu của bạn..."
                        value={newWordForm.meaning}
                        onChange={(e) => setNewWordForm({ ...newWordForm, meaning: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="font-bold block mb-1">Câu ví dụ ngữ cảnh (Ngoại ngữ)</label>
                      <input
                        type="text"
                        placeholder="VD: Fame in the world of rock and pop is largely ephemeral."
                        value={newWordForm.exampleEn}
                        onChange={(e) => setNewWordForm({ ...newWordForm, exampleEn: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="font-bold block mb-1 text-indigo-500">
                        💡 Ghi chú cá nhân / Mẹo nhớ từ (Mnemonics)
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập mẹo liên tưởng âm thanh hoặc ngữ cảnh gặp từ..."
                        value={newWordForm.personalNote}
                        onChange={(e) => setNewWordForm({ ...newWordForm, personalNote: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-800 border-indigo-500/40' : 'bg-indigo-50/50 border-indigo-200'
                        }`}
                      />
                    </div>

                    {/* Checkbox Nghiệp vụ: Đề xuất đóng góp từ này lên Kho từ điển chung cho Admin duyệt */}
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={contributeToSystem}
                        onChange={(e) => setContributeToSystem(e.target.checked)}
                        className="rounded text-indigo-600 w-3.5 h-3.5"
                      />
                      <span className="text-[11px] text-slate-500 dark:text-slate-300 font-medium">
                        Đóng góp từ này lên <strong className="text-amber-500">Kho từ Hệ thống</strong> (Chờ Admin duyệt)
                      </span>
                    </label>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddWordModalOpen(false)}
                        className="flex-1 py-2.5 rounded-xl font-bold bg-slate-200 dark:bg-slate-800"
                      >
                        Đóng
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                      >
                        Lưu & Đồng bộ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ===============================================================
                THANH ĐIỀU HƯỚNG DƯỚI CÙNG (TÍCH HỢP TAB ADMIN KHI Ở QUYỀN ADMIN)
               =============================================================== */}
            {activeTab !== 'login' && activeTab !== 'register' && (
              <div
                className={`absolute bottom-0 left-0 right-0 h-[68px] px-1.5 pb-2 pt-1.5 border-t flex items-center justify-around z-30 backdrop-blur-md transition-colors ${
                  darkMode
                    ? 'bg-slate-900/95 border-slate-800'
                    : 'bg-white/95 border-slate-200/80'
                }`}
              >
                {[
                  { id: 'home', label: 'Trang chủ', icon: Compass },
                  { id: 'search', label: 'Tra cứu', icon: Search },
                  { id: 'notebook', label: 'Sổ tay', icon: Folder },
                  { id: 'study', label: 'Ôn SM-2', icon: Layers },
                  { id: 'stats', label: 'Thống kê', icon: BarChart2 },
                  ...(userRole === 'ADMIN' || activeTab === 'admin'
                    ? [{ id: 'admin', label: 'Admin CMS', icon: ShieldAlert }]
                    : [{ id: 'profile', label: 'Tài khoản', icon: User }])
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id && !selectedWord;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedWordId(null);
                        setActiveTab(tab.id);
                      }}
                      className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-2xl transition-all ${
                        isActive
                          ? tab.id === 'admin'
                            ? 'text-amber-500 font-extrabold'
                            : 'text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium'
                      }`}
                    >
                      <div
                        className={`px-3 py-1 rounded-full transition-all ${
                          isActive
                            ? tab.id === 'admin'
                              ? 'bg-amber-500/15'
                              : 'bg-indigo-500/15'
                            : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px]">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Thanh Home Indicator dưới đáy màn hình điện thoại */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-slate-400/40 z-30 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}