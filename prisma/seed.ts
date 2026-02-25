// prisma/seed.ts
// Run with: npx prisma db seed
// Seeds the database with realistic mock data for development

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // ── CLEANUP ────────────────────────────────────────────────────────────────
    await prisma.notification.deleteMany();
    await prisma.mentorNote.deleteMany();
    await prisma.mentorAssignment.deleteMany();
    await prisma.prepTask.deleteMany();
    await prisma.application.deleteMany();
    await prisma.roadmapMilestone.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.alumni.deleteMany();
    await prisma.facultyMentor.deleteMany();
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();
    await prisma.job.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.careerRole.deleteMany();

    // ── USERS ──────────────────────────────────────────────────────────────────
    const studentUser = await prisma.user.create({
        data: {
            id: "u1",
            name: "Rachit Jain",
            email: "student@vpa.edu",
            password: "student123", // plain-text for demo; hash with bcrypt in production
            role: "student",
        },
    });

    const mentorUser = await prisma.user.create({
        data: {
            id: "u2",
            name: "Dr. Priya Sharma",
            email: "mentor@vpa.edu",
            password: "mentor123",
            role: "faculty_mentor",
        },
    });

    const coordinatorUser = await prisma.user.create({
        data: {
            id: "u3",
            name: "Prof. Anil Kumar",
            email: "coordinator@vpa.edu",
            password: "coord123",
            role: "course_coordinator",
        },
    });

    await prisma.user.createMany({
        data: [
            { id: "u4", name: "Admin User", email: "admin@vpa.edu", password: "admin123", role: "admin" },
            { id: "u5", name: "Dr. Ramesh Iyer", email: "dean@vpa.edu", password: "dean123", role: "dean" },
            { id: "u6", name: "Mr. Suresh Menon", email: "director@vpa.edu", password: "dir123", role: "director" },
            { id: "u7", name: "Ms. Kavitha Nair", email: "placement@vpa.edu", password: "place123", role: "placement_dept" },
            { id: "u8", name: "Arjun Verma", email: "alumni@vpa.edu", password: "alumni123", role: "alumni" },
        ],
    });

    // ── STUDENT PROFILE ────────────────────────────────────────────────────────
    const student = await prisma.student.create({
        data: {
            id: "s1",
            userId: studentUser.id,
            department: "CSE",
            program: "B.Tech CSE (Data Science)",
            currentYear: 3,
            currentSem: 6,
            cgpa: 8.7,
            activeBacklogs: 0,
            readinessScore: 72,
            placementProbability: 0.81,
            riskLevel: "low",
            leetcodeUsername: "rachitjain",
            leetcodeSolved: 187,
            leetcodeEasy: 90,
            leetcodeMedium: 78,
            leetcodeHard: 19,
            leetcodeStreak: 7,
            githubUsername: "rachit-jain",
            githubRepos: 12,
            githubCommits: 340,
            careerGoal: "Software Development Engineer",
            swocData: JSON.stringify({
                strengths: ["Strong DSA foundation", "Good teamwork", "Quick learner"],
                weaknesses: ["System Design knowledge gaps", "Low industry experience"],
                opportunities: ["Internship season upcoming", "Hackathons", "Open source"],
                challenges: ["High competition for product companies", "Time management"],
            }),
        },
    });

    // ── SKILLS ────────────────────────────────────────────────────────────────
    await prisma.skill.createMany({
        data: [
            { studentId: student.id, name: "Python", category: "technical", level: 85, verified: true, source: "assessment" },
            { studentId: student.id, name: "Data Structures", category: "technical", level: 78, verified: true, source: "self" },
            { studentId: student.id, name: "Machine Learning", category: "domain", level: 65, verified: false, source: "self" },
            { studentId: student.id, name: "SQL", category: "technical", level: 72, verified: true, source: "assessment" },
            { studentId: student.id, name: "React", category: "technical", level: 60, verified: false, source: "self" },
            { studentId: student.id, name: "System Design", category: "technical", level: 30, verified: false, source: "self" },
            { studentId: student.id, name: "Communication", category: "soft", level: 80, verified: false, source: "self" },
            { studentId: student.id, name: "Leadership", category: "soft", level: 55, verified: false, source: "self" },
        ],
    });

    // ── ROADMAP MILESTONES ─────────────────────────────────────────────────────
    await prisma.roadmapMilestone.createMany({
        data: [
            { studentId: student.id, year: 1, semester: 1, title: "Learn a programming language (Python/Java)", completed: true, category: "skill" },
            { studentId: student.id, year: 1, semester: 2, title: "Build your first mini project", completed: true, category: "project" },
            { studentId: student.id, year: 2, semester: 3, title: "Start competitive programming (LeetCode Easy)", completed: true, category: "skill" },
            { studentId: student.id, year: 2, semester: 4, title: "Complete 100 LeetCode problems", completed: true, category: "skill" },
            { studentId: student.id, year: 3, semester: 5, title: "Apply for summer internship (Sem 5)", completed: false, category: "placement" },
            { studentId: student.id, year: 3, semester: 6, title: "Solve 200 LeetCode problems", completed: false, category: "skill", dueDate: new Date("2026-06-01") },
            { studentId: student.id, year: 4, semester: 7, title: "Crack Amazon/Microsoft placement", completed: false, category: "placement" },
            { studentId: student.id, year: 4, semester: 8, title: "Get Dream Company offer", completed: false, category: "placement" },
        ],
    });

    // ── PREP TASKS ────────────────────────────────────────────────────────────
    await prisma.prepTask.createMany({
        data: [
            // Amazon
            { studentId: student.id, company: "Amazon", task: "Solve 200+ LeetCode (Arrays, Trees, DP, Graphs)", category: "Coding", completed: false },
            { studentId: student.id, company: "Amazon", task: "Study all 16 Amazon Leadership Principles", category: "Behavioural", completed: true },
            { studentId: student.id, company: "Amazon", task: "Prepare 10 STAR-format LP stories", category: "Behavioural", completed: false },
            { studentId: student.id, company: "Amazon", task: "Revise DBMS: joins, indexing, normalization", category: "CS Basics", completed: false },
            { studentId: student.id, company: "Amazon", task: "Study HLD basics: load balancer, caching, queues", category: "System Design", completed: false },
            { studentId: student.id, company: "Amazon", task: "Give 3 mock coding interviews", category: "Mock Test", completed: false },
            // Google
            { studentId: student.id, company: "Google", task: "Solve 250+ LeetCode (Hard included)", category: "Coding", completed: false },
            { studentId: student.id, company: "Google", task: "Study System Design (Designing Data-Intensive Apps)", category: "System Design", completed: false },
            { studentId: student.id, company: "Google", task: "Know Big-O for every solution", category: "Coding", completed: true },
            { studentId: student.id, company: "Google", task: "Master: Tries, Segment Trees, Bit Manipulation", category: "Coding", completed: false },
            { studentId: student.id, company: "Google", task: "Contribute to 1 open-source project", category: "Projects", completed: false },
            { studentId: student.id, company: "Google", task: "Give 5+ mock interviews on Pramp", category: "Mock Test", completed: false },
        ],
    });

    // ── FACULTY MENTOR ────────────────────────────────────────────────────────
    const mentor = await prisma.facultyMentor.create({
        data: {
            userId: mentorUser.id,
            department: "CSE",
            designation: "Assistant Professor",
        },
    });

    // ── MENTOR ASSIGNMENT ─────────────────────────────────────────────────────
    await prisma.mentorAssignment.create({
        data: {
            mentorId: mentor.id,
            studentId: student.id,
        },
    });

    // ── MENTOR NOTES ──────────────────────────────────────────────────────────
    await prisma.mentorNote.createMany({
        data: [
            {
                authorId: mentorUser.id,
                studentId: student.id,
                content: "Rachit shows strong aptitude in Python and DSA. Needs to focus on System Design and build 1–2 industry-level projects before Sem 7 placements.",
                isPrivate: false,
            },
            {
                authorId: mentorUser.id,
                studentId: student.id,
                content: "Recommended Rachit to apply for the Google Summer internship program. Should prepare leadership stories for Amazon interviews.",
                isPrivate: true,
            },
        ],
    });

    // ── JOBS ──────────────────────────────────────────────────────────────────
    await prisma.job.createMany({
        data: [
            {
                company: "Google",
                companyLogo: "G",
                companyColor: "bg-blue-500",
                type: "Product",
                ctc: "₹45 LPA",
                roles: JSON.stringify(["SDE-1", "ML Engineer"]),
                minCgpa: 7.5,
                noBacklogs: true,
                minLeetcode: 200,
                skills: JSON.stringify(["DSA", "System Design", "Python / Java", "ML Basics"]),
                process: JSON.stringify(["Online Assessment (90 min)", "3 Technical Rounds", "HR Round"]),
                tips: JSON.stringify(["Solve 250+ LeetCode (Trees, DP, Graphs)", "Prepare HLD + LLD", "Know Big-O for every solution"]),
                visitSemester: "Sem 8 (Jan 2027)",
                difficulty: "Very High",
            },
            {
                company: "Amazon",
                companyLogo: "A",
                companyColor: "bg-orange-500",
                type: "Product",
                ctc: "₹30 LPA",
                roles: JSON.stringify(["SDE-1", "Data Engineer"]),
                minCgpa: 7.0,
                noBacklogs: true,
                minLeetcode: 150,
                skills: JSON.stringify(["DSA", "OOP", "System Design", "SQL"]),
                process: JSON.stringify(["Online Assessment", "2 Technical Rounds", "Leadership Principles Round", "HR"]),
                tips: JSON.stringify(["Study Amazon's 16 Leadership Principles", "Practice medium-hard LeetCode", "Revise DBMS and SQL joins"]),
                visitSemester: "Sem 7 (Nov 2026)",
                difficulty: "High",
            },
            {
                company: "Microsoft",
                companyLogo: "M",
                companyColor: "bg-green-600",
                type: "Product",
                ctc: "₹26 LPA",
                roles: JSON.stringify(["SWE", "Data Scientist"]),
                minCgpa: 7.0,
                noBacklogs: true,
                minLeetcode: 120,
                skills: JSON.stringify(["DSA", "OOP", "Azure basics", "Python"]),
                process: JSON.stringify(["Online Assessment", "3 Interview Rounds (Coding + Design + HR)"]),
                tips: JSON.stringify(["Review OOP + SOLID principles", "Practice 120+ LeetCode medium", "Write clean readable code"]),
                visitSemester: "Sem 7 (Aug 2026)",
                difficulty: "High",
            },
            {
                company: "TCS",
                companyLogo: "T",
                companyColor: "bg-blue-700",
                type: "Service",
                ctc: "₹3.36–7 LPA",
                roles: JSON.stringify(["Systems Engineer", "Digital", "Ninja"]),
                minCgpa: 6.0,
                noBacklogs: true,
                minLeetcode: 50,
                skills: JSON.stringify(["Programming Basics", "Aptitude", "Verbal Ability"]),
                process: JSON.stringify(["TCS NQT (Aptitude + Coding)", "Technical Interview", "Managerial", "HR"]),
                tips: JSON.stringify(["Crack TCS NQT — practice IndiaBix", "Know basics of one OOP language", "English communication matters"]),
                visitSemester: "Sem 5 (Aug 2025)",
                difficulty: "Low",
            },
            {
                company: "Infosys",
                companyLogo: "I",
                companyColor: "bg-indigo-500",
                type: "Service",
                ctc: "₹3.6–6.5 LPA",
                roles: JSON.stringify(["Systems Engineer", "Power Programmer"]),
                minCgpa: 6.5,
                noBacklogs: false,
                minLeetcode: 30,
                skills: JSON.stringify(["Coding Basics", "Quantitative Aptitude", "Communication"]),
                process: JSON.stringify(["Infosys Placement Test (HackWithInfy / SP)", "HR Interview"]),
                tips: JSON.stringify(["Solve HackWithInfy previous year problems", "For SP track: coding + logic focus", "No backlog requirement is relaxed"]),
                visitSemester: "Sem 5 (Aug 2025)",
                difficulty: "Low-Medium",
            },
            {
                company: "Capgemini",
                companyLogo: "C",
                companyColor: "bg-teal-500",
                type: "Service",
                ctc: "₹4.5 LPA",
                roles: JSON.stringify(["Analyst", "Senior Analyst"]),
                minCgpa: 6.0,
                noBacklogs: false,
                minLeetcode: 20,
                skills: JSON.stringify(["Aptitude", "Logical Reasoning", "English", "Basic Coding"]),
                process: JSON.stringify(["Game Based Assessment", "Technical Interview", "HR"]),
                tips: JSON.stringify(["Practice SHL-style game-based assessments", "Focus on logical reasoning", "Review basic programming"]),
                visitSemester: "Sem 6 (Jan 2026)",
                difficulty: "Low-Medium",
            },
        ],
    });

    // ── ALUMNI ────────────────────────────────────────────────────────────────
    await prisma.alumni.create({
        data: {
            userId: "u8",
            graduationYear: 2023,
            currentCompany: "Google",
            currentRole: "SDE-2",
            location: "Bengaluru, India",
            linkedinUrl: "https://linkedin.com/in/arjunverma",
            willingToMentor: true,
            bio: "NMIMS CSE 2023 batch. Currently at Google Bengaluru. Happy to help juniors crack product companies.",
        },
    });

    // ── NOTIFICATIONS ─────────────────────────────────────────────────────────
    await prisma.notification.createMany({
        data: [
            { userId: studentUser.id, message: "AI Mentor has a new tip for you!", type: "info", read: false },
            { userId: studentUser.id, message: "Your LeetCode streak is at 7 days 🔥", type: "success", read: false },
            { userId: studentUser.id, message: "Skill gap detected: System Design", type: "warning", read: false },
            { userId: studentUser.id, message: "Capgemini campus drive registrations open", type: "info", read: false },
        ],
    });

    // ── SUBJECTS ─────────────────────────────────────────────────────────────
    await prisma.subject.createMany({
        data: [
            { code: "CS101", name: "Data Structures & Algorithms", semester: 3, credits: 4, department: "CSE", careerRelevance: JSON.stringify({ "SDE": 95, "Data Scientist": 80, "ML Engineer": 75 }) },
            { code: "CS102", name: "Database Management Systems", semester: 4, credits: 3, department: "CSE", careerRelevance: JSON.stringify({ "SDE": 85, "Data Scientist": 90, "Backend Dev": 95 }) },
            { code: "CS103", name: "Machine Learning", semester: 5, credits: 4, department: "CSE", careerRelevance: JSON.stringify({ "ML Engineer": 95, "Data Scientist": 95, "SDE": 50 }) },
            { code: "CS104", name: "Operating Systems", semester: 4, credits: 3, department: "CSE", careerRelevance: JSON.stringify({ "SDE": 80, "Systems Engineer": 90 }) },
            { code: "CS105", name: "Computer Networks", semester: 5, credits: 3, department: "CSE", careerRelevance: JSON.stringify({ "SDE": 70, "Network Engineer": 95, "Backend Dev": 75 }) },
            { code: "CS106", name: "Deep Learning", semester: 6, credits: 4, department: "CSE", careerRelevance: JSON.stringify({ "ML Engineer": 95, "Data Scientist": 90, "Researcher": 95 }) },
        ],
    });

    // ── CAREER ROLES ──────────────────────────────────────────────────────────
    await prisma.careerRole.createMany({
        data: [
            { title: "Software Development Engineer", category: "Tech", avgCTC: "₹12–45 LPA", requiredSkills: JSON.stringify(["DSA", "System Design", "OOP", "Git", "SQL"]), description: "Design, build, and maintain scalable software systems at product companies." },
            { title: "Data Scientist", category: "Tech", avgCTC: "₹10–30 LPA", requiredSkills: JSON.stringify(["Python", "ML", "Statistics", "SQL", "Pandas"]), description: "Derive insights from data using statistical models and machine learning." },
            { title: "ML Engineer", category: "Tech", avgCTC: "₹14–40 LPA", requiredSkills: JSON.stringify(["Python", "Deep Learning", "MLOps", "TensorFlow", "Docker"]), description: "Build and deploy machine learning models at scale." },
            { title: "Product Manager", category: "Business", avgCTC: "₹15–35 LPA", requiredSkills: JSON.stringify(["Product Thinking", "SQL", "Communication", "Agile", "Roadmapping"]), description: "Define product vision and work with engineering to ship features." },
        ],
    });

    console.log("✅ Seeding complete!");
    console.log("   Users:              9");
    console.log("   Students:           1");
    console.log("   Skills:             8");
    console.log("   Roadmap Milestones: 8");
    console.log("   Prep Tasks:        12");
    console.log("   Jobs:               6");
    console.log("   Subjects:           6");
    console.log("   Career Roles:       4");
}

main()
    .catch((e) => { console.error("❌ Seed error:", e); process.exit(1); })
    .finally(() => prisma.$disconnect());
