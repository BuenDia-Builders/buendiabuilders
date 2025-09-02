'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User,
  BookOpen, 
  Award,
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Users,
  Code2,
  Rocket,
  Target
} from 'lucide-react';

export default function DashboardPage() {
  const { t } = useLanguage();

  // Mock user data
  const user = {
    name: 'María González',
    role: 'Web3 Builder',
    level: 'Intermediate',
    progress: 65,
    streak: 12,
    points: 2450,
  };

  const courses = [
    {
      title: 'Solidity Fundamentals',
      progress: 85,
      status: 'En progreso',
      nextLesson: 'Smart Contract Security',
      duration: '2h 15m',
    },
    {
      title: 'DeFi Protocols Deep Dive',
      progress: 40,
      status: 'En progreso',
      nextLesson: 'Automated Market Makers',
      duration: '1h 45m',
    },
    {
      title: 'Web3 Frontend with React',
      progress: 100,
      status: 'Completado',
      nextLesson: 'Certificado disponible',
      duration: 'Finalizado',
    },
  ];

  const achievements = [
    {
      title: 'First Smart Contract',
      description: 'Deployed your first smart contract',
      icon: Code2,
      earned: true,
      date: '2024-01-15',
    },
    {
      title: 'DeFi Explorer',
      description: 'Completed DeFi fundamentals course',
      icon: Target,
      earned: true,
      date: '2024-01-22',
    },
    {
      title: 'Community Contributor',
      description: 'Helped 10+ fellow builders',
      icon: Users,
      earned: true,
      date: '2024-02-03',
    },
    {
      title: 'Protocol Master',
      description: 'Built a complete DeFi protocol',
      icon: Rocket,
      earned: false,
      date: null,
    },
  ];

  const upcomingEvents = [
    {
      title: 'Solana Developer Workshop',
      date: '2024-02-15',
      time: '19:00 GMT-3',
      type: 'Workshop',
      instructor: 'Carlos Mendez',
    },
    {
      title: 'DeFi Protocol Design Session',
      date: '2024-02-18',
      time: '20:00 GMT-3',
      type: 'Masterclass',
      instructor: 'Ana Silva',
    },
    {
      title: 'Monthly Demo Day',
      date: '2024-02-28',
      time: '18:00 GMT-3',
      type: 'Demo',
      instructor: 'Community',
    },
  ];

  const projects = [
    {
      title: 'DeFi Lending Protocol',
      description: 'Building a lending/borrowing platform on Ethereum',
      status: 'En desarrollo',
      progress: 70,
      mentor: 'Roberto Martinez',
      deadline: '2024-03-15',
    },
    {
      title: 'NFT Marketplace',
      description: 'Full-stack marketplace for digital collectibles',
      status: 'Planificación',
      progress: 20,
      mentor: 'Laura Vega',
      deadline: '2024-04-30',
    },
  ];

  const communityStats = {
    totalBuilders: 1247,
    activeToday: 156,
    completedProjects: 89,
    jobPlacements: 23,
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">¡Hola, {user.name}! 👋</h1>
            <p className="text-muted-foreground">Continúa construyendo tu futuro Web3</p>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
            {user.level} Builder
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">{user.progress}%</div>
              <p className="text-sm text-muted-foreground">Progreso General</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">{user.streak}</div>
              <p className="text-sm text-muted-foreground">Días consecutivos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-500 mb-1">{user.points}</div>
              <p className="text-sm text-muted-foreground">Puntos ganados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">3</div>
              <p className="text-sm text-muted-foreground">Certificaciones</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
            <TabsTrigger value="community">Comunidad</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Progress Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Tu progreso esta semana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{course.title}</span>
                          <Badge variant={course.status === 'Completado' ? 'default' : 'outline'}>
                            {course.status}
                          </Badge>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Próximo: {course.nextLesson}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Próximos eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 3).map((event, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {event.date} • {event.time}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    Ver todos los eventos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold">{course.title}</h3>
                      <Badge variant={course.status === 'Completado' ? 'default' : 'outline'}>
                        {course.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <Progress value={course.progress} className="h-3" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{course.progress}% completado</span>
                        <span>{course.duration}</span>
                      </div>
                      <p className="text-sm">
                        <strong>Próximo:</strong> {course.nextLesson}
                      </p>
                    </div>
                    
                    <Button className="w-full mt-4" size="sm">
                      {course.status === 'Completado' ? 'Ver certificado' : 'Continuar'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Progreso</span>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Mentor: {project.mentor}</span>
                        <span>Deadline: {project.deadline}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      Abrir proyecto
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`group transition-all duration-300 ${
                  achievement.earned 
                    ? 'border-green-500/50 bg-green-500/5 hover:shadow-lg' 
                    : 'border-muted hover:border-muted-foreground/50'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      achievement.earned 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <achievement.icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="font-bold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {achievement.description}
                    </p>
                    
                    {achievement.earned ? (
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Obtenido {achievement.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        En progreso
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            {/* Community Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    {communityStats.totalBuilders.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Builders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">
                    {communityStats.activeToday}
                  </div>
                  <p className="text-sm text-muted-foreground">Activos hoy</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-500 mb-1">
                    {communityStats.completedProjects}
                  </div>
                  <p className="text-sm text-muted-foreground">Proyectos completados</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-1">
                    {communityStats.jobPlacements}
                  </div>
                  <p className="text-sm text-muted-foreground">Job placements</p>
                </CardContent>
              </Card>
            </div>

            {/* Community Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Actividad reciente de la comunidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong>Carlos M.</strong> completó el curso de Solidity Advanced
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong>Ana L.</strong> lanzó su DeFi protocol en testnet
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 4 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Award className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <strong>Roberto S.</strong> obtuvo trabajo como Blockchain Developer
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 1 día</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Ver más actividad
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}