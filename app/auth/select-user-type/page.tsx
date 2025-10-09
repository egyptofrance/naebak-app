'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, UserCheck, Vote } from 'lucide-react'
import { toast } from 'sonner'

type UserType = 'citizen' | 'mp' | 'candidate'

interface UserTypeOption {
  value: UserType
  title: string
  description: string
  icon: React.ReactNode
  badge?: string
  activationMessage?: string
}

const userTypeOptions: UserTypeOption[] = [
  {
    value: 'citizen',
    title: 'مواطن',
    description: 'حساب مواطن عادي للمشاركة في الأنشطة المدنية والتواصل مع النواب',
    icon: <Users className="h-8 w-8" />,
    badge: 'تفعيل فوري'
  },
  {
    value: 'mp',
    title: 'نائب حالي',
    description: 'حساب نائب في البرلمان المصري للتواصل مع المواطنين وإدارة الأنشطة البرلمانية',
    icon: <UserCheck className="h-8 w-8" />,
    badge: 'يتطلب استكمال البيانات',
    activationMessage: 'سيتم توجيهك لاستكمال بياناتك الشخصية والمهنية'
  },
  {
    value: 'candidate',
    title: 'مرشح للعضوية',
    description: 'حساب مرشح لعضوية البرلمان للتواصل مع الناخبين وعرض البرنامج الانتخابي',
    icon: <Vote className="h-8 w-8" />,
    badge: 'يتطلب استكمال البيانات',
    activationMessage: 'سيتم توجيهك لاستكمال بياناتك الشخصية والانتخابية'
  }
]

export default function SelectUserTypePage() {
  const [selectedType, setSelectedType] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async () => {
    if (!selectedType) {
      toast.error('يرجى اختيار نوع الحساب')
      return
    }

    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error('لم يتم العثور على المستخدم')
        router.push('/auth/login')
        return
      }

      // Update user type and account status
      const accountStatus = selectedType === 'citizen' ? 'active' : 'pending'
      
      const { error } = await supabase
        .from('users')
        .update({ 
          user_type: selectedType,
          account_status: accountStatus,
          is_profile_complete: selectedType === 'citizen' // Citizens can start using immediately
        })
        .eq('id', user.id)

      if (error) {
        console.error('Error updating user type:', error)
        toast.error('حدث خطأ أثناء تحديث نوع الحساب')
        return
      }

      // Show appropriate message and redirect based on user type
      const selectedOption = userTypeOptions.find(option => option.value === selectedType)
      
      toast.success('تم حفظ نوع الحساب. يرجى استكمال بياناتك الشخصية.')
      
      // توجيه للوحة التحكم المناسبة لاستكمال البيانات
      if (selectedType === 'citizen') {
        router.push('/dashboard/citizen-profile')
      } else if (selectedType === 'mp') {
        router.push('/dashboard/mp-profile')
      } else if (selectedType === 'candidate') {
        router.push('/dashboard/candidate-profile')
      }

    } catch (error) {
      console.error('Error:', error)
      toast.error('حدث خطأ غير متوقع')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            اختر نوع حسابك
          </h1>
          <p className="text-gray-600">
            يرجى تحديد نوع الحساب المناسب لك لإكمال عملية التسجيل
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {userTypeOptions.map((option) => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedType === option.value 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedType(option.value)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {option.icon}
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                {option.badge && (
                  <Badge 
                    variant={option.value === 'citizen' ? 'default' : 'secondary'}
                    className="mx-auto"
                  >
                    {option.badge}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm leading-relaxed">
                  {option.description}
                </CardDescription>
                {option.activationMessage && selectedType === option.value && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800 text-center">
                      {option.activationMessage}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedType || isLoading}
            size="lg"
            className="px-8"
          >
            {isLoading ? 'جاري الحفظ...' : 'تأكيد الاختيار'}
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            يمكنك تغيير نوع الحساب لاحقاً من خلال الإعدادات
          </p>
        </div>
      </div>
    </div>
  )
}
